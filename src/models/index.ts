import { UserModel } from "./User";
import { ArtistModel } from "./Artist";
import { AlbumModel } from "./Album";
import { TrackModel } from "./Track";
import { FavoriteModel } from "./Favorite";
import { OrganizationModel } from "./Organization";

export enum ModelNames {
  USER_MODEL = "USER_MODEL",
  ARTIST_MODEL = "ARTIST_MODEL",
  ALBUM_MODEL = "ALBUM_MODEL",
  TRACK_MODEL = "TRACK_MODEL",
  FAVORITE_MODEL = "FAVORITE_MODEL",
  ORGANIZATION_MODEL = "ORGANIZATION_MODEL",
}

const models = {
  [ModelNames.USER_MODEL]: UserModel,
  [ModelNames.ARTIST_MODEL]: ArtistModel,
  [ModelNames.ALBUM_MODEL]: AlbumModel,
  [ModelNames.TRACK_MODEL]: TrackModel,
  [ModelNames.FAVORITE_MODEL]: FavoriteModel,
  [ModelNames.ORGANIZATION_MODEL]: OrganizationModel,
};

export default models;
