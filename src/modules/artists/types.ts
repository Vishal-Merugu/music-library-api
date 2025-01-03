import { Request, Response, NextFunction } from "express";
import { ArtistDocument } from "../../models/Artist";

export interface GetArtistResponse<T = ArtistDocument | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface GetArtistsResponse<T = ArtistDocument[] | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface AddArtistPayload {
  name: string;
  grammy?: number;
  hidden?: boolean;
}

export interface AddArtistResponse<T = ArtistDocument | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface UpdateArtistPayload {
  name?: string;
  grammy?: number;
  hidden?: boolean;
}

export interface UpdateArtistResponse {
  data: null;
  message: string;
  error: string | null;
}

export interface DeleteArtistResponse<T = { artist_id: string } | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface IArtistControllers {
  getArtistById: (
    req: Request<{ id: string }>,
    res: Response<GetArtistResponse>,
    next: NextFunction
  ) => void;
  getAllArtists: (
    req: Request<
      {},
      {},
      {},
      { limit?: string; offset?: string; grammy?: string; hidden?: string }
    >,
    res: Response<GetArtistsResponse>,
    next: NextFunction
  ) => void;
  addArtist: (
    req: Request<{}, {}, AddArtistPayload>,
    res: Response<AddArtistResponse>,
    next: NextFunction
  ) => void;
  updateArtist: (
    req: Request<{ id: string }, {}, UpdateArtistPayload>,
    res: Response<UpdateArtistResponse>
  ) => void;
  deleteArtist: (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response<DeleteArtistResponse>,
    next: NextFunction
  ) => void;
}

export interface IArtistValidators {
  getArtistById: (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => void;
  getAllArtists: (
    req: Request<
      {},
      {},
      {},
      { limit?: string; offset?: string; grammy?: string; hidden?: string }
    >,
    res: Response,
    next: NextFunction
  ) => void;
  addArtist: (
    req: Request<{}, {}, AddArtistPayload>,
    res: Response,
    next: NextFunction
  ) => void;
  updateArtist: (
    req: Request<{ id: string }, {}, UpdateArtistPayload>,
    res: Response,
    next: NextFunction
  ) => void;
  deleteArtist: (req: Request, res: Response, next: NextFunction) => void;
}
