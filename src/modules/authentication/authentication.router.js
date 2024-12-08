import { handleLogin } from "../authentication/authentication.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/", handleLogin);

export default router;
