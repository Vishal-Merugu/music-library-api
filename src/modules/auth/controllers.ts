import { Request, Response } from "express";
import { redisUtils } from "../../config/redis";
import jwt from "jsonwebtoken";
import ENV from "../../config/env";
import { comparePassword } from "./utils";
import { IControllers } from "./types";
import bcrypt from "bcryptjs";
import { createDocument, getDocuments } from "../../utils/dbUtils";
import { ModelNames } from "../../models";
import { OrganizationDocument } from "../../models/Organization";
import { UserDocument, UserRole } from "../../models/User";
import mongoose from "mongoose";

const Controllers: IControllers = {
  signup: async (req, res) => {
    const { email, password, organization } = req.body;

    try {
      const existingUser = await getDocuments(
        ModelNames.USER_MODEL,
        { email },
        null
      );
      if (existingUser) {
        return res.status(409).json({
          data: null,
          message: "Email already exists.",
          error: null,
        });
      }

      const exisitingOrganisation = await getDocuments<OrganizationDocument>(
        ModelNames.ORGANIZATION_MODEL,
        { name: organization },
        null
      );

      let role: UserRole;
      let organizationId: mongoose.Types.ObjectId;

      if (exisitingOrganisation) {
        role = UserRole.VIEWER;
        organizationId = exisitingOrganisation._id;
      } else {
        role = UserRole.ADMIN;
        const newOrganization = await createDocument<OrganizationDocument>(
          ModelNames.ORGANIZATION_MODEL,
          { name: organization, _id: new mongoose.Types.ObjectId() }
        );
        organizationId = newOrganization._id;
      }

      const hashedPassword = await bcrypt.hash(password.toString(), 10);

      const newUser = await createDocument<UserDocument>(
        ModelNames.USER_MODEL,
        {
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hashedPassword,
          organizationId,
          role,
        }
      );

      const token = jwt.sign({ id: newUser._id }, ENV.JWT_SECRET, {
        expiresIn: "10h",
      });

      await redisUtils.set(
        `user_session:${newUser._id}`,
        newUser.toObject(),
        3600
      );

      res.status(201).json({
        data: { token },
        message: "User created successfully.",
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await getDocuments<UserDocument>(ModelNames.USER_MODEL, {
        email,
      });
      if (!user) {
        return res.status(404).json({
          data: null,
          message: "User  not found.",
          error: null,
        });
      }

      if (await comparePassword(password, user.password)) {
        const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
          expiresIn: "1h",
        });

        await redisUtils.set(`user_session:${user._id}`, user.toObject(), 3600);

        res.status(200).json({
          data: { token },
          message: "Login successful.",
          error: null,
        });
      } else {
        res.status(401).json({
          data: null,
          message: "Invalid credentials",
          error: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  },

  logout: async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization as string;

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
      const userId = decoded.id;

      await redisUtils.del(`user_session:${userId}`);

      res.status(200).json({
        data: null,
        message: "User  logged out successfully.",
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: null,
      });
    }
  },
};

export default Controllers;
