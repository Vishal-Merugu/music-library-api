import { Request, Response, NextFunction } from "express";
import { TrackDocument } from "../../models/Track";

export interface IApiResponse<T> {
  data: T;
  message: string;
  error: string | null;
}

export type GetAllTracksPayload = {
  limit?: string;
  offset?: string;
  hidden?: string;
  artist_id: string;
  album_id: string;
};

export interface AddTrackPayload {
  artist_id: string;
  album_id: string;
  name: string;
  duration: number;
  hidden?: boolean;
}

export interface ITrackControllers {
  getAllTracks: (
    req: Request<{}, {}, {}, GetAllTracksPayload>,
    res: Response<IApiResponse<TrackDocument[] | null>>,
    next: NextFunction
  ) => void;

  getTrack: (
    req: Request<{ id: string }>,
    res: Response<IApiResponse<TrackDocument | null>>,
    next: NextFunction
  ) => void;

  addTrack: (
    req: Request<{}, {}, AddTrackPayload>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;

  updateTrack: (
    req: Request<{ id: string }, {}, Partial<TrackDocument>>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;

  deleteTrack: (
    req: Request<{ id: string }>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;
}

export interface ITrackValidators {
  getAllTracks: (
    req: Request<{}, {}, {}, GetAllTracksPayload>,
    res: Response,
    next: NextFunction
  ) => void;

  getTrack: (
    req: Request<{ id: string }>,
    res: Response<IApiResponse<TrackDocument | null>>,
    next: NextFunction
  ) => void;

  addTrack: (
    req: Request<{}, {}, AddTrackPayload>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;

  updateTrack: (
    req: Request<{ id: string }, {}, Partial<TrackDocument>>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;

  deleteTrack: (
    req: Request<{ id: string }>,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => void;
}
