export const isManager = (req, res, next) => {
  if (req.userInfo.role != 2) {
    return res
      .status(401)
      .send("Ban khong co quyen truy cap vao tinh nang nay!");
  }
  return next();
};
