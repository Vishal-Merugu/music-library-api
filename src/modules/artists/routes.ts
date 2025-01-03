import express from "express";
import Controller from "./controllers";
import Validator from "./validators";
import authenticateJWT from "../../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/:id",
  authenticateJWT,
  Validator.getArtistById,
  Controller.getArtistById
);

router.post(
  "/add-artist",
  authenticateJWT,
  Validator.addArtist,
  Controller.addArtist
);

router.put(
  "/:id",
  authenticateJWT,
  Validator.updateArtist,
  Controller.updateArtist
);

router.delete(
  "/:id",
  authenticateJWT,
  Validator.deleteArtist,
  Controller.deleteArtist
);

router.get(
  "/",
  authenticateJWT,
  Validator.getAllArtists,
  Controller.getAllArtists
);

export default router;
