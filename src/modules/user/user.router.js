import { Router } from "express";
import { getProfileById, updateProfileById } from "../user/user.controllers.js";
import { isAuth } from "../authentication/authentication.middlewares.js";

const router = Router();

router.get("/profile", isAuth, getProfileById);
router.put("/profile", updateProfileById);

//quên mật khẩu

export default router;
