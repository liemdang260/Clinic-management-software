import doctorControllers from "../doctor/doctor.controllers.js";
import express from "express";
const router = express.Router();

router.get("/room", doctorControllers.getRoom);
router.put("/diagnostic/", doctorControllers.updateDiagnosticDT);
export default router;
