import mongoose from "mongoose";
import { ModelNames } from "../../models";
import { AlbumDocument } from "../../models/Album";
import { ArtistDocument } from "../../models/Artist";
import { FavoriteCategory, FavoriteDocument } from "../../models/Favorite";
import { TrackDocument } from "../../models/Track";
import {
  createDocument,
  deleteDocuments,
  getDocuments,
} from "../../utils/dbUtils";
import { IFavoriteControllers } from "./types";

const controllers: IFavoriteControllers = {
  async getFavorites(req, res) {
    const { category } = req.params;

    const { limit = 5, offset = 0 } = req.query;

    try {
      const favorites = await getDocuments<FavoriteDocument, true>(
        ModelNames.FAVORITE_MODEL,
        {
          userId: req.user._id,
          category,
        },
        {
          itemId: 1,
        },
        {
          limit: Number(limit),
          offset: Number(offset),
        },
        true
      );

      const favoriteIds = favorites.map((favorite) => favorite.itemId);

      const modelName =
        category === FavoriteCategory.TRACK
          ? ModelNames.TRACK_MODEL
          : category === FavoriteCategory.ALBUM
          ? ModelNames.ALBUM_MODEL
          : ModelNames.ARTIST_MODEL;

      const favoriteDocs = await getDocuments<
        TrackDocument | AlbumDocument | ArtistDocument,
        true
      >(
        modelName,
        {
          _id: { $in: favoriteIds },
        },
        {},
        {},
        true
      );

      return res.status(200).json({
        data: favoriteDocs,
        message: "Favorites retrieved successfully",
        error: null,
      });
    } catch (err) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: (err as Error).message,
      });
    }
  },

  async addFavorite(req, res) {
    const { category, item_id } = req.body;

    try {
      await createDocument<FavoriteDocument>(ModelNames.FAVORITE_MODEL, {
        _id: new mongoose.Types.ObjectId(),
        userId: req.user._id,
        itemId: new mongoose.Types.ObjectId(item_id),
        category,
      });

      return res.status(200).json({
        data: null,
        message: "Favorite added successfully",
        error: null,
      });
    } catch (err) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: (err as Error).message,
      });
    }
  },

  removeFavorite: async (req, res) => {
    const { id } = req.params;

    try {
      await deleteDocuments<FavoriteDocument>(ModelNames.FAVORITE_MODEL, {
        _id: new mongoose.Types.ObjectId(id),
      });

      return res.status(200).json({
        data: null,
        message: "Favorite removed successfully",
        error: null,
      });
    } catch (err) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: (err as Error).message,
      });
    }
  },
};

export default controllers;
