import { Request, Response, NextFunction } from "express";

export interface SignupPayload {
  email: string;
  password: string;
  organization: string;
}

export interface SignupResponse<T = null | { token: string }> {
  data: T;
  message: string;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse<T = null | { token: string }> {
  data: T;
  message: string;
  error: string | null;
}

export interface IValidators {
  signup: (
    req: Request<{}, {}, SignupPayload>,
    res: Response<SignupResponse>,
    next: NextFunction
  ) => void;
  login: (
    req: Request<{}, {}, LoginPayload>,
    res: Response<LoginResponse<any>>,
    next: NextFunction
  ) => void;
  logout: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IControllers {
  signup: (
    req: Request<{}, {}, SignupPayload>,
    res: Response<SignupResponse>
  ) => void;
  login: (
    req: Request<{}, {}, LoginPayload>,
    res: Response<LoginResponse>,
    next: NextFunction
  ) => void;
  logout: (req: Request, res: Response) => void;
}
