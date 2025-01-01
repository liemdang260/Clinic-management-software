import { Response, NextFunction } from "express";
import { CustomRequest } from "../../interfaces/CustomRequest";

export const isManager = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.userInfo?.role != "2") {
    res.status(401).send("Ban khong co quyen truy cap vao tinh nang nay!");
    return;
  }
  return next();
};
