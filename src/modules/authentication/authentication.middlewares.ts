import CustomError, { errorMessage } from "../../services/customError.js";
import { decryptAccessToken } from "./authentication.methods.js";

export const isAuth = (req, _, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw errorMessage.invalidAccessToken;
    }

    const verify = decryptAccessToken(access_token);

    if (!verify) {
      throw errorMessage.invalidAccessToken;
    }

    req.userInfo = verify.payload;

    return next();
  } catch (error) {
    console.log("loi access token");

    next(error);
  }
};
