import md5 from "md5";
import jwt from "jsonwebtoken";
import { Actor } from "../../interfaces/CustomRequest";

export const enCryptPassword = (pass: string): string => {
  return md5(pass);
};

export const generateAccessToken = async (actor: Actor): Promise<string> => {
  const privateKey = process.env.PRIVATEKEY || "";
  const tokenLife = process.env.TOKENLIFE;
  try {
    return await jwt.sign(
      {
        actor,
      },
      privateKey,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    console.log(`Loi tao accesstoken: ${error}`);
    throw Error;
  }
};

export const decryptAccessToken = (token: string): Actor | undefined => {
  const privateKey = process.env.PRIVATEKEY || "";
  const tokenLife = process.env.TOKENLIFE;
  try {
    return jwt.verify(token, privateKey, {
      ignoreExpiration: true,
    }) as Actor;
  } catch (error) {
    console.log("loi giai ma access token!");
  }
};
