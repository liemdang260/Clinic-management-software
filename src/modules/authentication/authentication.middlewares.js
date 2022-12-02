import CustomError, { ERROR_MESSAGE } from "../../services/customError.js";
import { decryptAccessToken } from "./authentication.methods.js";

export const isAuth = (req, _, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new CustomError({ code: 401, ...ERROR_MESSAGE.invalidAccessToken });
    }

    const verify = decryptAccessToken(access_token);

    if (!verify) {
      throw new CustomError({ code: 401, ...ERROR_MESSAGE.invalidAccessToken });
    }

    req.userInfo = verify.payload;

    return next();
  } catch (error) {
    console.log("loi access token");

    next(error);
  }
};
