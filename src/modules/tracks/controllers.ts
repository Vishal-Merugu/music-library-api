import { Request, Response } from "express";
import { TrackDocument, TrackModel } from "../../models/Track";
import { ITrackControllers } from "./types";
import {
  createDocument,
  deleteDocuments,
  getDocuments,
  updateDocuments,
} from "../../utils/dbUtils";
import { ModelNames } from "../../models";
import mongoose from "mongoose";
import { ArtistDocument } from "../../models/Artist";
import { AlbumDocument } from "../../models/Album";

const TrackController: ITrackControllers = {
  getAllTracks: async (req, res) => {
    const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

    try {
      const filter: any = {};
      if (artist_id) filter.artistId = new mongoose.Types.ObjectId(artist_id);
      if (album_id) filter.albumId = new mongoose.Types.ObjectId(album_id);
      if (hidden !== undefined) filter.hidden = hidden === "true";

      const tracks = await getDocuments<TrackDocument, true>(
        ModelNames.TRACK_MODEL,
        filter,
        null,
        {
          limit: Number(limit),
          skip: Number(offset),
        },
        true
      );

      res.status(200).json({
        data: tracks,
        message: "Tracks retrieved successfully.",
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

  addTrack: async (req, res) => {
    const { artist_id, album_id, name, duration, hidden } = req.body;

    try {
      const [artist, album] = await Promise.all([
        getDocuments<ArtistDocument>(ModelNames.ARTIST_MODEL, {
          _id: new mongoose.Types.ObjectId(artist_id),
        }),
        getDocuments<AlbumDocument>(ModelNames.ALBUM_MODEL, {
          _id: new mongoose.Types.ObjectId(album_id),
        }),
      ]);

      await createDocument<TrackDocument>(ModelNames.TRACK_MODEL, {
        artistId: new mongoose.Types.ObjectId(artist_id),
        albumId: new mongoose.Types.ObjectId(album_id),
        artistName: artist?.name || "",
        albumName: album?.name || "",
        name,
        duration,
        hidden,
        _id: new mongoose.Types.ObjectId(),
      });

      res.status(201).json({
        data: null,
        message: "Track created successfully.",
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

  updateTrack: async (req, res) => {
    const { id } = req.params;
    const { name, duration, hidden } = req.body;

    try {
      const track = await updateDocuments<TrackDocument>(
        ModelNames.TRACK_MODEL,
        { _id: new mongoose.Types.ObjectId(id) },
        { name, duration, hidden }
      );

      if (!track) {
        return res.status(404).json({
          data: null,
          message: "Track not found.",
          error: null,
        });
      }

      res.status(204).json({
        data: null,
        message: "Track updated successfully.",
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

  deleteTrack: async (req, res) => {
    const { id } = req.params;

    try {
      const track = await deleteDocuments<TrackDocument>(
        ModelNames.TRACK_MODEL,
        { _id: new mongoose.Types.ObjectId(id) }
      );

      if (!track) {
        return res.status(404).json({
          data: null,
          message: "Track not found.",
          error: null,
        });
      }

      res.status(200).json({
        data: null,
        message: `Track: ${track.name} deleted successfully.`,
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
};

export default TrackController;
