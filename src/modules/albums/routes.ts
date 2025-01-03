import express from "express";
import Controller from "./controllers";
import Validator from "./validators";
import authenticateJWT from "../../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/:id",
  authenticateJWT,
  Validator.getAlbumById,
  Controller.getAlbumById
);

router.post(
  "/add-album",
  authenticateJWT,
  Validator.addAlbum,
  Controller.addAlbum
);

router.put(
  "/:id",
  authenticateJWT,
  Validator.updateAlbum,
  Controller.updateAlbum
);

router.delete(
  "/:id",
  authenticateJWT,
  Validator.deleteAlbum,
  Controller.deleteAlbum
);

router.get(
  "/",
  authenticateJWT,
  Validator.getAllAlbums,
  Controller.getAllAlbums
);

export default router;
