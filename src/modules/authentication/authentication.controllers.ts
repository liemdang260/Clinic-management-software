import {
  enCryptPassword,
  generateAccessToken,
} from "./authentication.methods.js";
import { Account, Employee } from "../../models";
import { Request, Response } from "express";

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  let username = req.body.username;
  let password = enCryptPassword(req.body.password);

  try {
    const account = await Account.findAll({
      where: {
        username: username,
      },
      include: [Employee],
    });
    if (!account || account.length == 0) {
      res.status(404).send("Khong tim thay user!");
      return;
    }
    if (password.localeCompare(account[0].password) != 0) {
      res.status(401).send("Mat khau khong dung!");
      return;
    }

    let access_token;
    try {
      access_token = await generateAccessToken({
        id: account[0].id,
        name: account[0].employee.name,
        username: account[0].username,
        isActive: account[0].isActive,
        role: account[0].role,
      });
      if (!access_token) throw Error;
    } catch (error) {
      console.log("Loi tao access token");
      throw Error;
    }

    const data = {
      access_token: access_token,
    };
    res.json(data);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Loi server!");
    return;
  }
};
