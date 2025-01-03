import mongoose from "mongoose";
import { UserRole } from "../../models/User";
import { isEmail } from "../../utils/stringUtils";
import { IUserValidators } from "./types";
import { Request, Response, NextFunction } from "express";

const UserValidators: IUserValidators = {
  addUser: (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;

    if (req.user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        data: null,
        message: "Forbidden: Only admins can create users.",
        error: null,
      });
    }

    if (!email || !isEmail(email)) {
      return res.status(400).json({
        data: null,
        message: "Invalid email format.",
        error: null,
      });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        data: null,
        message: "Password must be at least 6 characters long.",
        error: null,
      });
    }

    if (!role || ![UserRole.EDITOR, UserRole.VIEWER].includes(role)) {
      return res.status(400).json({
        data: null,
        message: "Role must be one of Editor or Viewer.",
        error: null,
      });
    }

    next();
  },
  deleteUser: (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: null,
      });
    }

    next();
  },
  updatePassword: (req: Request, res: Response, next: NextFunction) => {
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Old password and new password are required.",
        error: null,
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "New password must be at least 6 characters long.",
        error: null,
      });
    }

    next();
  },
};

export default UserValidators;
