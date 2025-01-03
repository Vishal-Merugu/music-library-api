import { Request, Response, NextFunction } from "express";
import { UserDocument, UserRole } from "../../models/User";

export interface GetUsersResponse<T = UserDocument[] | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface UpdateUserPayload {
  email?: string;
  role?: UserRole;
}

export interface UpdateUserResponse<T = UserDocument | null> {
  data: T;
  message: string;
  error: string | null;
}

export interface DeleteUserResponse {
  data: null;
  message: string;
  error: string | null;
}

export interface IUserControllers {
  getAllUsers: (
    req: Request<
      {},
      {},
      {},
      { limit?: string; offset?: string; role?: string }
    >,
    res: Response<GetUsersResponse>,
    next: NextFunction
  ) => void;
  addUser: (
    req: Request<{}, {}, { email: string; password: string; role: UserRole }>,
    res: Response,
    next: NextFunction
  ) => void;
  deleteUser: (
    req: Request<{ id: string }>,
    res: Response<DeleteUserResponse>,
    next: NextFunction
  ) => void;
  updatePassword: (
    req: Request<{}, {}, { old_password: string; new_password: string }>,
    res: Response<UpdateUserResponse>,
    next: NextFunction
  ) => void;
}

export interface IUserValidators {
  addUser: (
    req: Request<{}, {}, { email: string; password: string; role: UserRole }>,
    res: Response,
    next: NextFunction
  ) => void;
  deleteUser: (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => void;
  updatePassword: (
    req: Request<{}, {}, { old_password: string; new_password: string }>,
    res: Response<UpdateUserResponse>,
    next: NextFunction
  ) => void;
}
