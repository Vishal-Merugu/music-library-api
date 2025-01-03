import express from "express";
import Controller from "./controllers";
import Validator from "./validators";
import authenticateJWT from "../../middlewares/authMiddleware";

const router = express.Router();

router.get("/:id", authenticateJWT, Validator.getTrack, Controller.getTrack);

router.post(
  "/add-track",
  authenticateJWT,
  Validator.addTrack,
  Controller.addTrack
);

router.put(
  "/:id",
  authenticateJWT,
  Validator.updateTrack,
  Controller.updateTrack
);

router.delete(
  "/:id",
  authenticateJWT,
  Validator.deleteTrack,
  Controller.deleteTrack
);

router.get(
  "/",
  authenticateJWT,
  //   Validator.getAllTracks as any,
  Controller.getAllTracks
);

export default router;
