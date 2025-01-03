import { Request, Response, NextFunction } from "express";
import { IArtistValidators } from "./types";
import { isValidObjectId } from "mongoose";
import { UserRole } from "../../models/User";

const ArtistValidators: IArtistValidators = {
  getArtistById: (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid artist ID format.",
        error: null,
      });
    }

    next();
  },

  getAllArtists: (req: Request, res: Response, next: NextFunction) => {
    const { limit, offset, grammy, hidden } = req.query;

    if (limit !== undefined && isNaN(Number(limit))) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Limit must be a number.",
        error: null,
      });
    }

    if (offset !== undefined && isNaN(Number(offset))) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Offset must be a number.",
        error: null,
      });
    }

    if (grammy !== undefined && isNaN(Number(grammy))) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Grammy must be a number.",
        error: null,
      });
    }

    if (hidden !== undefined && !["true", "false"].includes(hidden as string)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Hidden must be either true or false.",
        error: null,
      });
    }

    next();
  },

  addArtist: (req, res, next) => {
    const { name, grammy, hidden } = req.body;

    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Name is required and must be a string.",
        error: null,
      });
    }

    if (grammy !== undefined && typeof grammy !== "number") {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Grammy must be a number.",
        error: null,
      });
    }

    if (hidden !== undefined && typeof hidden !== "boolean") {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Hidden must be a boolean.",
        error: null,
      });
    }

    next();
  },

  updateArtist: (req, res, next) => {
    const { name, grammy, hidden } = req.body;

    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    if (name && typeof name !== "string") {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid name format.",
        error: null,
      });
    }

    if (grammy !== undefined && typeof grammy !== "number") {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Grammy value.",
        error: null,
      });
    }

    if (hidden !== undefined && typeof hidden !== "boolean") {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid hidden status.",
        error: null,
      });
    }

    next();
  },

  deleteArtist: (req, res, next) => {
    if (req.user.role === UserRole.VIEWER) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access",
        error: null,
      });
    }

    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid artist ID format.",
        error: null,
      });
    }

    next();
  },
};

export default ArtistValidators;
