import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel, UserDocument } from "../models/User";
import ENV from "../config/env";
import { redisUtils } from "../config/redis";

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, ENV.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          data: null,
          message: "Bad Request",
          error: null,
        });
      }

      const userId = (decoded as jwt.JwtPayload)?.id;
      if (!userId) {
        return res.status(401).json({
          data: null,
          message: "Unauthorized Access",
          error: null,
        });
      }

      const cachedUser: UserDocument | null = await redisUtils.get(
        `user_session:${userId}`
      );

      if (cachedUser) {
        req.user = cachedUser;
      } else {
        const user = await UserModel.findById(userId);
        if (user?.toObject()) {
          await redisUtils.set(`user_session:${userId}`, user, 3600);
          req.user = user.toObject();
        } else {
          return res.sendStatus(404);
        }
      }
      next();
    });
  } else {
    res.status(401).json({
      data: null,
      message: "Unauthorized Access",
      error: null,
    });
  }
};

export default authenticateJWT;
