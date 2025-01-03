import express from "express";
import FavoriteController from "./controllers";
import FavoriteValidator from "./validators";
import authenticateJWT from "../../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/:category",
  authenticateJWT,
  FavoriteValidator.getFavorites,
  FavoriteController.getFavorites
);

router.post(
  "/add-favorite",
  authenticateJWT,
  FavoriteValidator.addFavorite,
  FavoriteController.addFavorite
);

router.delete(
  "/remove-favorite/:id",
  authenticateJWT,
  FavoriteValidator.removeFavorite,
  FavoriteController.removeFavorite
);
export default router;
