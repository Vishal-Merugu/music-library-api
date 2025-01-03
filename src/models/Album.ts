import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Album {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  year!: number;

  @prop()
  hidden?: boolean;

  @prop({ required: true })
  artist_id!: Types.ObjectId;
}

export const AlbumModel = getModelForClass(Album);

export type AlbumDocument = Album & { _id: Types.ObjectId };
