import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const requestType = req.method;
  const requestUrl = req.originalUrl;
  const timestamp = new Date().toISOString();

  console.log(
    `TimeStamp = [${timestamp}] Method = ${requestType} URL = ${requestUrl}`
  );

  next();
};
