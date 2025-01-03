import { isValidObjectId } from "mongoose";
import { FavoriteCategory } from "../../models/Favorite";
import { IFavoriteValidators } from "./types";

const validators: IFavoriteValidators = {
  getFavorites(req, res, next) {
    const { category } = req.params;
    if (
      !category ||
      ![
        FavoriteCategory.ALBUM,
        FavoriteCategory.TRACK,
        FavoriteCategory.ARTIST,
      ].includes(category)
    ) {
      return res.status(400).json({
        data: null,
        message: "Invalid category",
        error: null,
      });
    } else {
      next();
    }
  },

  addFavorite(req, res, next) {
    const { category, item_id } = req.body;
    if (
      !category ||
      ![
        FavoriteCategory.ALBUM,
        FavoriteCategory.TRACK,
        FavoriteCategory.ARTIST,
      ].includes(category) ||
      !item_id
    ) {
      return res.status(400).json({
        data: null,
        message: "Invalid category or item ID",
        error: null,
      });
    } else {
      next();
    }
  },

  removeFavorite(req, res, next) {
    const { id } = req.params;
    if (!id || isValidObjectId(id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid ID",
        error: null,
      });
    } else {
      next();
    }
  },
};

export default validators;
