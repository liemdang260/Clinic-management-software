import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../../services/customError.js";

//TODO fix bug
export const enCryptPassword = (password) => {
  const saltRounds = process.env.SALT_ROUNDS || 10;
  bcrypt
    .hash(password, saltRounds)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw ERROR_MESSAGE.serverError;
    });
};

export const comparePassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const generateAccessToken = (payload) => {
  const privateKey = process.env.PRIVATE_KEY;
  const tokenLife = process.env.TOKEN_LIFE;
  try {
    return jwt.sign(
      {
        payload,
      },
      privateKey,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
    );
  } catch (error) {
    console.log(`Loi tao accesstoken: ${error}`);
    throw ERROR_MESSAGE.invalidGeneratedAccessToken;
  }
};

// TODO test this function
export const decryptAccessToken = (token) => {
  const privateKey = process.env.PRIVATE_KEY;
  try {
    return jwt.verify(token, privateKey, {
      //TODO ignoreExpiration: true,
      ignoreExpiration: false,
    });
  } catch (error) {
    console.log("loi giai ma access token!");
    throw ERROR_MESSAGE.invalidAccessToken;
  }
};
