import { Request, Response, NextFunction } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { ITrackValidators } from "./types";
import { getDocuments } from "../../utils/dbUtils";
import { TrackDocument } from "../../models/Track";
import { ModelNames } from "../../models";

const TrackValidator: ITrackValidators = {
  getTrack: async (req, res) => {
    const { id } = req.params;

    try {
      const track = await getDocuments<TrackDocument>(ModelNames.TRACK_MODEL, {
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!track) {
        return res.status(404).json({
          data: null,
          message: "Track not found.",
          error: null,
        });
      }

      res.status(200).json({
        data: track,
        message: "Track retrieved successfully.",
        error: null,
      });
    } catch (error) {
      res.status(400).json({
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  getAllTracks: (req, res, next) => {
    const { artist_id, album_id } = req.query;

    if (artist_id && !isValidObjectId(artist_id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid artist_id format.",
        error: null,
      });
    }

    if (album_id && !isValidObjectId(album_id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid album_id format.",
        error: null,
      });
    }

    next();
  },

  addTrack: (req, res, next) => {
    const { artist_id, album_id, name, duration, hidden } = req.body;

    if (!artist_id || !isValidObjectId(artist_id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid artist_id format.",
        error: null,
      });
    }

    if (!album_id || !isValidObjectId(album_id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid album_id format.",
        error: null,
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        data: null,
        message: "Track name is required and should be a string.",
        error: null,
      });
    }

    if (duration && typeof duration !== "number") {
      return res.status(400).json({
        data: null,
        message: "Duration should be a number.",
        error: null,
      });
    }

    next();
  },

  updateTrack: (req, res, next) => {
    const { name, duration, hidden } = req.body;

    if (name && typeof name !== "string") {
      return res.status(400).json({
        data: null,
        message: "Track name should be a string.",
        error: null,
      });
    }

    if (duration && typeof duration !== "number") {
      return res.status(400).json({
        data: null,
        message: "Duration should be a number.",
        error: null,
      });
    }

    next();
  },

  deleteTrack: (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid track_id format.",
        error: null,
      });
    }

    next();
  },
};

export default TrackValidator;
