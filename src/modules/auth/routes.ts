import express from "express";
import Validator from "./validators";
import Controller from "./controllers";

const router = express.Router();

router.post("/signup", Validator.signup, Controller.signup);

router.post("/login", Validator.login, Controller.login);

router.get("/logout", Validator.logout, Controller.logout);

export default router;
