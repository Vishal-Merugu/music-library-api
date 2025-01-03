import { Request, Response } from "express";
import {
  createDocument,
  deleteDocuments,
  getDocuments,
  updateDocuments,
} from "../../utils/dbUtils";
import { ArtistDocument } from "../../models/Artist";
import { IArtistControllers } from "./types";
import { ModelNames } from "../../models";
import mongoose from "mongoose";

const controllers: IArtistControllers = {
  getArtistById: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const artist = await getDocuments<ArtistDocument>(
        ModelNames.ARTIST_MODEL,
        {
          _id: new mongoose.Types.ObjectId(id),
        }
      );

      if (!artist) {
        return res.status(404).json({
          status: 404,
          data: null,
          message: "Artist not found.",
          error: null,
        });
      }

      res.status(200).json({
        status: 200,
        data: artist,
        message: "Artist retrieved successfully.",
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

  getAllArtists: async (req: Request, res: Response) => {
    const { limit = 5, offset = 0, grammy, hidden } = req.query;

    try {
      const query: Partial<ArtistDocument> = {};
      if (grammy !== undefined) (query as any).grammy = Number(grammy);
      if (hidden !== undefined) (query as any).hidden = hidden === "true";

      const artists = await getDocuments<ArtistDocument, true>(
        ModelNames.ARTIST_MODEL,
        query,
        null,
        {
          limit: Number(limit),
          skip: Number(offset),
        },
        true
      );

      res.status(200).json({
        status: 200,
        data: artists,
        message: "Artists retrieved successfully.",
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

  addArtist: async (req: Request, res: Response) => {
    const { name, grammy, hidden } = req.body;

    try {
      const newArtist = await createDocument<ArtistDocument>(
        ModelNames.ARTIST_MODEL,
        {
          _id: new mongoose.Types.ObjectId(),
          name,
          grammy,
          hidden,
        }
      );

      return res.status(201).json({
        status: 201,
        data: newArtist,
        message: "Artist created successfully.",
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  updateArtist: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, grammy, hidden } = req.body;

    try {
      const updatedArtist = await updateDocuments<ArtistDocument>(
        ModelNames.ARTIST_MODEL,
        { _id: id },
        { name, grammy, hidden }
      );

      if (!updatedArtist) {
        return res.status(404).json({
          status: 404,
          data: null,
          message: "Artist not found.",
          error: null,
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  deleteArtist: async (req, res) => {
    const { id } = req.params;

    try {
      const artist = await deleteDocuments<ArtistDocument>(
        ModelNames.ARTIST_MODEL,
        {
          _id: new mongoose.Types.ObjectId(id),
        }
      );

      if (!artist) {
        return res.status(404).json({
          data: null,
          message: "Artist not found.",
          error: null,
        });
      }

      res.status(200).json({
        data: { artist_id: id },
        message: `Artist: ${artist.name} deleted successfully.`,
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

export default controllers;
