import express from "express";
import Controller from "./controllers";
import authenticateJWT from "../../middlewares/authMiddleware";
import Validators from "./validators";

const router = express.Router();

router.post(
  "/add-user",
  authenticateJWT,
  Validators.addUser,
  Controller.addUser
);

router.delete(
  "/:id",
  authenticateJWT,
  Validators.deleteUser,
  Controller.deleteUser
);

router.put(
  "/update-password",
  authenticateJWT,
  Validators.updatePassword,
  Controller.updatePassword
);

router.get("/", authenticateJWT, Controller.getAllUsers);

export default router;
