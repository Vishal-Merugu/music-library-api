import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Organization {
  _id!: Types.ObjectId;

  @prop({ required: true, unique: true })
  name!: string;
}

export const OrganizationModel = getModelForClass(Organization);

export type OrganizationDocument = Organization;
