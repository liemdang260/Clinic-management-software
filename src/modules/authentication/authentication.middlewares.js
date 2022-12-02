import { decryptAccessToken } from "./authentication.methods.js";

export const isAuth = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      return res.status(401).send("Khong tim thay access token!");
    }
    let verify = await decryptAccessToken(access_token);
    if (!verify) {
      res.status(401).send("Ban khong co quyen truy cap vao tinh nang nay!");
    }
    let payload = verify.payload;
    req.userInfo = payload;
    return next();
  } catch (error) {
    console.log("loi access token");
    next(error);
  }
};
