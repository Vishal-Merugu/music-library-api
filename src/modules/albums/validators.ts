import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { UserRole } from "../../models/User";
import { IAlbumValidators } from "./types";

const AlbumValidators: IAlbumValidators = {
  getAllAlbums: (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    const { artist_id } = req.query;
    if (artist_id && !isValidObjectId(artist_id)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid artist ID format.",
        error: null,
      });
    }

    next();
  },

  getAlbumById: (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid album ID format.",
        error: null,
      });
    }

    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    next();
  },

  addAlbum: (req, res, next) => {
    const { artist_id, name, year, hidden } = req.body;

    if (!artist_id || !name || !year) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Missing required fields: artist_id, name, or year.",
        error: null,
      });
    }

    if (!isValidObjectId(artist_id)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid artist_id format.",
        error: null,
      });
    }

    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    next();
  },

  updateAlbum: (req, res, next) => {
    const { name, year, hidden } = req.body;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid album_id format.",
        error: null,
      });
    }

    if (!name && !year && hidden === undefined) {
      return res.status(400).json({
        data: null,
        message:
          "At least one field (name, year, or hidden) must be provided for update.",
        error: null,
      });
    }

    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    next();
  },

  deleteAlbum: (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid album_id format.",
        error: null,
      });
    }

    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    next();
  },
};

export default AlbumValidators;
