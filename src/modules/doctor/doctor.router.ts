import { updateDiagnosticDT } from "./doctor.controllers.js";
import { Router } from "express";

const router = Router();

router.put("/diagnostic/:id", updateDiagnosticDT);
export default router;
