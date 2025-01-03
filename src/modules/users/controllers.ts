import mongoose from "mongoose";
import { ModelNames } from "../../models";
import { UserDocument, UserRole } from "../../models/User";
import {
  createDocument,
  deleteDocuments,
  getDocuments,
  updateDocuments,
} from "../../utils/dbUtils";
import { IUserControllers } from "./types";
import { comparePassword } from "../auth/utils";
import bcrypt from "bcryptjs";

const controllers: IUserControllers = {
  getAllUsers: async (req, res) => {
    const { limit = 5, offset = 0, role } = req.query;

    if (req.user.role !== UserRole.ADMIN) {
      return res.status(401).json({
        data: null,
        message: "Unauthorized Access",
        error: null,
      });
    }

    try {
      const query = {
        role: role ? role : { $ne: "Admin" },
        organizationId: req.user.organizationId,
      };

      const users = await getDocuments<UserDocument, true>(
        ModelNames.USER_MODEL,
        query,
        {
          password: 0,
        },
        {
          limit: Number(limit),
          skip: Number(offset),
        },
        true
      );

      res.status(200).json({
        data: users,
        message: "Users retrieved successfully.",
        error: null,
      });
    } catch (error) {
      res.status(400).json({
        data: null,
        message: "Bad Request",
        error: null,
      });
    }
  },

  addUser: async (req, res) => {
    const { email, password, role } = req.body;

    try {
      const existingUser = await getDocuments<UserDocument, false>(
        ModelNames.USER_MODEL,
        { email }
      );

      if (existingUser) {
        return res.status(409).json({
          status: 409,
          data: null,
          message: "Email already exists.",
          error: null,
        });
      }

      const hashedPassword = await bcrypt.hash(password.toString(), 10);

      await createDocument<UserDocument>(ModelNames.USER_MODEL, {
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hashedPassword,
        role,
      });

      return res.status(201).json({
        status: 201,
        data: null,
        message: "User created successfully.",
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== "Admin") {
      return res.status(403).json({
        data: null,
        message: "Forbidden Access/Operation not allowed.",
        error: null,
      });
    }

    try {
      const user = await getDocuments<UserDocument, false>(
        ModelNames.USER_MODEL,
        {
          _id: new mongoose.Types.ObjectId(id),
        }
      );

      if (!user) {
        return res.status(404).json({
          data: null,
          message: "User not found.",
          error: null,
        });
      }

      await deleteDocuments<UserDocument>(ModelNames.USER_MODEL, {
        _id: new mongoose.Types.ObjectId(id),
      });

      return res.status(200).json({
        data: null,
        message: "User deleted successfully.",
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },

  updatePassword: async (req, res) => {
    const { old_password, new_password } = req.body;
    const userId = req.user._id;

    try {
      const user = await getDocuments<UserDocument, false>(
        ModelNames.USER_MODEL,
        {
          _id: userId,
        }
      );

      if (!user) {
        return res.status(404).json({
          data: null,
          message: "User not found.",
          error: null,
        });
      }

      const isOldPasswordValid = await comparePassword(
        old_password,
        user.password
      );
      if (!isOldPasswordValid) {
        return res.status(400).json({
          data: null,
          message: "Old password is incorrect.",
          error: null,
        });
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      await updateDocuments<UserDocument>(
        ModelNames.USER_MODEL,
        { _id: userId },
        { password: hashedPassword }
      );

      return res.status(204).json({
        data: null,
        message: "Password updated successfully.",
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  },
};

export default controllers;
