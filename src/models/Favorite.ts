import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";

export enum FavoriteCategory {
  TRACK = "track",
  ALBUM = "album",
  ARTIST = "artist",
}

export class Favorite {
  @prop({ required: true })
  userId!: Types.ObjectId;

  @prop({ required: true })
  itemId!: Types.ObjectId;

  @prop({ required: true, enum: FavoriteCategory })
  category!: FavoriteCategory;
}

export const FavoriteModel = getModelForClass(Favorite);

export type FavoriteDocument = Favorite & { _id: Types.ObjectId };
