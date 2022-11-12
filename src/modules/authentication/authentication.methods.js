import md5 from "md5";
import jwt from "jsonwebtoken";

export const enCryptPassword = (pass) => {
  return md5(pass);
};

export const generateAccessToken = async (payload) => {
  const privateKey = process.env.PRIVATEKEY;
  const tokenLife = process.env.TOKENLIFE;
  try {
    return await jwt.sign(
      {
        payload,
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

export const decryptAccessToken = async (token) => {
  const privateKey = process.env.PRIVATEKEY;
  const tokenLife = process.env.TOKENLIFE;
  try {
    return await jwt.verify(token, privateKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log("loi giai ma access token!");
  }
};
