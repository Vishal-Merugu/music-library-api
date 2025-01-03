import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Artist {
  @prop({ required: true })
  name!: string;

  @prop({ default: 0 })
  grammy?: number;

  @prop({ default: false })
  hidden?: boolean;

  _id!: Types.ObjectId;
}

export const ArtistModel = getModelForClass(Artist);

export type ArtistDocument = Artist & { _id: Types.ObjectId };
