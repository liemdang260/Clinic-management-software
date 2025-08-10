import authenticationRouter from "../authentication/authentication.controllers.js";
import express from "express";
const router = express.Router();
router.post("/", authenticationRouter.handleLogin);

export default router;
