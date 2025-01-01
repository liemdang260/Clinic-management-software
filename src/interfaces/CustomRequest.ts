import { Request } from "express";

export interface Actor {
  id: string;
  name: string;
  username: string;
  isActive: boolean;
  role: string;
}

export type CustomRequest = Request & {
  userInfo?: Actor;
};
