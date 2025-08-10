import userController from "../user/user.controllers.js";
import { isAuth } from "../authentication/authentication.middlewares.js";
import express from "express";
const router = express.Router();

router.get("/profile", isAuth, userController.getProfileById);
router.put("/profile", userController.updateProfileById);
router.put("/password", userController.changPassword);

router.get("/medical-examination-fee", userController.getAllService);

router.get("/doctor", userController.getAllDoctor);
// forgot password

export default router;
