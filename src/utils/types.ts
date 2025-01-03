import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { DeleteResult, UpdateWriteOpResult } from "mongoose";

export type ModelType<T> = ReturnModelType<AnyParamConstructor<T>>;

export type GetOperationReturn<
  T,
  IsFindMany extends boolean
> = IsFindMany extends true ? DocumentType<T>[] : DocumentType<T> | null;

export type DeleteOperationReturn<
  T,
  IsMany extends boolean
> = IsMany extends true ? DeleteResult : DocumentType<T> | null;

export type UpdateOperationReturn<
  T,
  IsUpdateMany extends boolean
> = IsUpdateMany extends true ? UpdateWriteOpResult : DocumentType<T> | null;

export type CreateOperationReturn<T> = DocumentType<T>;
