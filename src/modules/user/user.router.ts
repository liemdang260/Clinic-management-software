import { Router } from "express";

import { isAuth } from "../authentication/authentication.middlewares.js";
import { getProfileById, updateProfileById } from "./user.controllers.js";

const router = Router();

router.get("/profile", isAuth, getProfileById);
router.put("/profile", updateProfileById);

//quên mật khẩu

export default router;
