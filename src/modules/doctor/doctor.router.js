import { updateDiagnosticDT } from "../doctor/doctor.controllers.js";
import { Router } from "express";

const router = Router();

router.put("/diagnostic/:id", updateDiagnosticDT);
export default router;
