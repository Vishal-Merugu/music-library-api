import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Track {
  @prop({ required: true })
  name!: string;

  @prop()
  artistName?: string;

  @prop({ required: true })
  artistId!: Types.ObjectId;

  @prop({ required: true })
  albumId!: Types.ObjectId;

  @prop()
  albumName?: string;

  @prop({ required: true })
  duration!: number;

  @prop()
  hidden?: boolean;
}

export const TrackModel = getModelForClass(Track);

export type TrackDocument = Track & { _id: Types.ObjectId };
