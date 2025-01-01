import { CustomRequest } from "../../interfaces/CustomRequest.js";
import { decryptAccessToken } from "./authentication.methods.js";
import { Request, Response, NextFunction } from "express";

export const isAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let access_token = req.headers.access_token as string;
  if (!access_token) {
    res.status(401).send("Khong tim thay access token!");
    return;
  }
  let actor = decryptAccessToken(access_token);
  if (!actor) {
    res.status(401).send("Ban khong co quyen truy cap vao tinh nang nay!");
    return;
  }

  req.userInfo = actor;
  next();
};
