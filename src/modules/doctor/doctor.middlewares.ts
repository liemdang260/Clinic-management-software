import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/CustomRequest";

export const isDoctor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.userInfo?.role != "3") {
    res.status(401).send("Ban khong co quyen truy cap vao tinh nang nay!");
    return;
  }
  next();
};
