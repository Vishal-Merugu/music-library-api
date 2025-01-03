import { Request, Response, NextFunction } from "express";
import { AlbumDocument } from "../../models/Album";

export interface GetAlbumsResponse<T = AlbumDocument[] | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface GetAlbumResponse<T = AlbumDocument | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface AddAlbumResponse {
  status: number;
  data: null;
  message: string;
  error: string | null;
}

export interface UpdateAlbumResponse {
  data: null;
  message: string;
  error: string | null;
}

export interface DeleteAlbumResponse {
  data: null;
  message: string;
  error: string | null;
}

export interface IAlbumControllers {
  getAllAlbums: (
    req: Request<
      { id?: string },
      {},
      {},
      { limit?: string; offset?: string; artist_id?: string; hidden?: string }
    >,
    res: Response<GetAlbumsResponse>,
    next: NextFunction
  ) => void;
  getAlbumById: (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response<GetAlbumResponse>,
    next: NextFunction
  ) => void;
  addAlbum: (
    req: Request<
      {},
      {},
      { artist_id: string; name: string; year: number; hidden?: boolean }
    >,
    res: Response<AddAlbumResponse>,
    next: NextFunction
  ) => void;
  updateAlbum: (
    req: Request<
      { id: string },
      {},
      { name?: string; year?: number; hidden?: boolean }
    >,
    res: Response<UpdateAlbumResponse>,
    next: NextFunction
  ) => void;
  deleteAlbum: (
    req: Request<{ id: string }>,
    res: Response<DeleteAlbumResponse>,
    next: NextFunction
  ) => void;
}

export interface IAlbumValidators {
  getAllAlbums: (req: Request, res: Response, next: NextFunction) => void;
  getAlbumById: (req: Request, res: Response, next: NextFunction) => void;
  addAlbum: (req: Request, res: Response, next: NextFunction) => void;
  updateAlbum: (
    req: Request<
      { id: string },
      {},
      { name?: string; year?: number; hidden?: boolean }
    >,
    res: Response<UpdateAlbumResponse>,
    next: NextFunction
  ) => void;
  deleteAlbum: (
    req: Request<{ id: string }>,
    res: Response<DeleteAlbumResponse>,
    next: NextFunction
  ) => void;
}
