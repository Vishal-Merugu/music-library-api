import { ModelNames } from "../../models";
import {
  createDocument,
  deleteDocuments,
  getDocuments,
} from "../../utils/dbUtils";
import { IAlbumControllers } from "./types";
import { AlbumDocument } from "../../models/Album";
import mongoose from "mongoose";

const AlbumControllers: IAlbumControllers = {
  getAllAlbums: async (req, res) => {
    const { limit = 5, offset = 0, artist_id, hidden } = req.query;

    try {
      const query = {
        ...(artist_id && { artist_id: new mongoose.Types.ObjectId(artist_id) }),
        ...(hidden && { hidden: hidden === "true" }),
      };

      const albums = await getDocuments<AlbumDocument, true>(
        ModelNames.ALBUM_MODEL,
        query,
        null,
        {
          limit: Number(limit),
          skip: Number(offset),
        },
        true
      );

      res.status(200).json({
        data: albums,
        message: "Albums retrieved successfully.",
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

  getAlbumById: async (req, res) => {
    const { id } = req.params;

    try {
      const album = await getDocuments<AlbumDocument>(ModelNames.ALBUM_MODEL, {
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!album) {
        return res.status(404).json({
          data: null,
          message: "Album not found.",
          error: null,
        });
      }

      res.status(200).json({
        data: album,
        message: "Album retrieved successfully.",
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

  addAlbum: async (req, res) => {
    const { artist_id, name, year, hidden } = req.body;

    try {
      const newAlbum = await createDocument<AlbumDocument>(
        ModelNames.ALBUM_MODEL,
        {
          _id: new mongoose.Types.ObjectId(),
          name,
          year,
          hidden: hidden || false,
          artist_id: new mongoose.Types.ObjectId(artist_id),
        }
      );

      res.status(201).json({
        status: 201,
        data: null,
        message: "Album created successfully.",
        error: null,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  updateAlbum: async (req, res) => {
    const { id } = req.params;
    const { name, year, hidden } = req.body;

    try {
      const album = await getDocuments<AlbumDocument>(ModelNames.ALBUM_MODEL, {
        _id: new mongoose.Types.ObjectId(id),
      });

      if (!album) {
        return res.status(404).json({
          data: null,
          message: "Album not found.",
          error: null,
        });
      }

      if (name) album.name = name;
      if (year) album.year = year;
      if (hidden !== undefined) album.hidden = hidden;

      await album.save();

      res.status(204).send();
    } catch (error) {
      res.status(400).json({
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  deleteAlbum: async (req, res) => {
    const { id } = req.params;

    try {
      const album = await deleteDocuments<AlbumDocument>(
        ModelNames.ALBUM_MODEL,
        {
          _id: id,
        }
      );

      if (!album) {
        return res.status(404).json({
          data: null,
          message: "Album not found.",
          error: null,
        });
      }

      res.status(200).json({
        data: null,
        message: `Album: ${album.name} deleted successfully.`,
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

export default AlbumControllers;
