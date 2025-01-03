import { Request, Response, NextFunction } from "express";
import { FavoriteCategory } from "../../models/Favorite";
import { TrackDocument } from "../../models/Track";
import { ArtistDocument } from "../../models/Artist";
import { AlbumDocument } from "../../models/Album";

export interface IApiResponse<T> {
  data: T;
  message: string;
  error: string | null;
}

export type GetFavoritesResponse =
  | TrackDocument[]
  | ArtistDocument[]
  | AlbumDocument[]
  | null;

export interface IFavoriteValidators {
  getFavorites: (
    req: Request<
      { category: FavoriteCategory },
      {},
      {},
      { limit?: string; offset?: string }
    >,
    res: Response<IApiResponse<GetFavoritesResponse>>,
    next: NextFunction
  ) => void;

  addFavorite: (
    req: Request<{}, {}, { category: FavoriteCategory; item_id: string }>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;

  removeFavorite: (
    req: Request<{ id: string }, {}>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;
}

export interface IFavoriteControllers {
  getFavorites: (
    req: Request<
      { category: FavoriteCategory },
      {},
      {},
      { limit?: string; offset?: string }
    >,
    res: Response<IApiResponse<GetFavoritesResponse>>,
    next: NextFunction
  ) => void;

  addFavorite: (
    req: Request<{}, {}, { category: FavoriteCategory; item_id: string }>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;

  removeFavorite: (
    req: Request<{ id: string }, {}>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;
}
