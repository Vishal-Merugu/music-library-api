import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "Admin",
  EDITOR = "Editor",
  VIEWER = "Viewer",
}
export class User {
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ enum: UserRole, default: UserRole.VIEWER })
  role?: UserRole;

  _id!: Types.ObjectId;

  @prop()
  organizationId?: Types.ObjectId;
}

export const UserModel = getModelForClass(User);

export type UserDocument = User & { _id: Types.ObjectId };
