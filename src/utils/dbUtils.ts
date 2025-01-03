import {
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  PipelineStage,
  MongooseUpdateQueryOptions,
  QueryOptions,
  MongooseQueryOptions,
  AggregateOptions,
} from "mongoose";
import { DocumentType } from "@typegoose/typegoose";
import models, { ModelNames } from "../models";
import {
  DeleteOperationReturn,
  GetOperationReturn,
  ModelType,
  UpdateOperationReturn,
  CreateOperationReturn,
} from "./types";

class DatabaseOperationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "DatabaseOperationError";
  }
}

async function getModel<T>(modelName: ModelNames): Promise<ModelType<T>> {
  const model = models[modelName];
  if (!model) {
    throw new DatabaseOperationError(`Model ${modelName} not found`);
  }
  return model as unknown as ModelType<T>;
}

async function handleDatabaseOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    throw new DatabaseOperationError(
      errorMessage,
      error instanceof Error ? error : undefined
    );
  }
}

export async function createDocument<T>(
  modelName: ModelNames,
  documentData: T
): Promise<CreateOperationReturn<T>> {
  const model = await getModel<T>(modelName);

  return handleDatabaseOperation(
    async () =>
      await model.create(documentData).then((doc) => {
        doc.save();
        return doc as CreateOperationReturn<T>;
      }),
    `Error creating document in ${modelName}`
  );
}

export async function getDocuments<T, IsFindMany extends boolean = false>(
  modelName: ModelNames,
  query: FilterQuery<DocumentType<T>> = {},
  projection: ProjectionType<DocumentType<T>> | null = null,
  options?: QueryOptions,
  isFindMany?: boolean
): Promise<GetOperationReturn<T, IsFindMany>> {
  const model = await getModel<T>(modelName);

  return handleDatabaseOperation(async () => {
    if (isFindMany) {
      return model.find(query, projection || {}, options).exec() as Promise<
        GetOperationReturn<T, IsFindMany>
      >;
    }
    return model.findOne(query, projection, options).exec() as Promise<
      GetOperationReturn<T, IsFindMany>
    >;
  }, `Error fetching document(s) from ${modelName}`);
}

export async function updateDocuments<T, IsUpdateMany extends boolean = false>(
  modelName: ModelNames,
  query: FilterQuery<DocumentType<T>>,
  updateData: UpdateQuery<DocumentType<T>>,
  options: MongooseUpdateQueryOptions = {},
  isUpdateMany: IsUpdateMany = false as IsUpdateMany
): Promise<UpdateOperationReturn<T, IsUpdateMany>> {
  const model = await getModel<T>(modelName);

  return handleDatabaseOperation(async () => {
    if (isUpdateMany) {
      return model.updateMany(query, updateData, options).exec() as Promise<
        UpdateOperationReturn<T, IsUpdateMany>
      >;
    }
    return model
      .findOneAndUpdate(query, updateData, { new: true, ...options })
      .exec() as Promise<UpdateOperationReturn<T, IsUpdateMany>>;
  }, `Error updating document(s) in ${modelName}`);
}

export async function deleteDocuments<T, IsMany extends boolean = false>(
  modelName: ModelNames,
  query: FilterQuery<DocumentType<T>>,
  options: MongooseQueryOptions = {},
  isDeleteMany: IsMany = false as IsMany
): Promise<DeleteOperationReturn<T, IsMany>> {
  const model = await getModel<T>(modelName);

  return handleDatabaseOperation(async () => {
    if (isDeleteMany) {
      const result = await model.deleteMany(query, options).exec();
      return result as DeleteOperationReturn<T, IsMany>;
    }
    const result = await model.findOneAndDelete(query, options).exec();
    return result as DeleteOperationReturn<T, IsMany>;
  }, `Error deleting document(s) from ${modelName}`);
}

export async function aggregateDocuments<T, R = unknown>(
  modelName: ModelNames,
  pipeline: PipelineStage[],
  options: AggregateOptions = {}
): Promise<R[]> {
  const model = await getModel<T>(modelName);

  return handleDatabaseOperation(
    async () => model.aggregate<R>(pipeline, options).exec(),
    `Error performing aggregation on ${modelName}`
  );
}
