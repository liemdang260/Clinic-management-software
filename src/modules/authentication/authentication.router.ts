import { handleLogin } from "./authentication.controllers";
import { Router } from "express";

const router = Router();

router.post("/", handleLogin);

export default router;
