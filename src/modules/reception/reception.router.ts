import {
  createAppointment,
  getAllAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentByWeek,
  getAppointmentRequest,
  updateAppointmentStatus,
  // getDiagnosticStack,
  createPatient,
  getAllPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  createDiagnostic,
  getAllDiagnostic,
  getDiagnosticById,
  updateDiagnostic,
  deleteDiagnostic,
} from "./reception.controllers";
import { isAuth } from "../authentication/authentication.middlewares.js";
import { Router } from "express";

const router = Router();

router.post("/appointment", createAppointment);
router.get("/appointment", getAllAppointment);
router.get("/appointment/:id", getAppointmentById);
router.post("/appointment-by-week", getAppointmentByWeek);
// router.get('/appointment',getAppointmentInDay)
router.put("/appointment/:id", updateAppointment);
router.delete("/appointment/:id", deleteAppointment);

router.get("/appointment-request", getAppointmentRequest);
router.put("/appointment-request/:id", updateAppointmentStatus);
// router.get("/diagnostic-stack", getDiagnosticStack);

router.post("/patient", createPatient);
router.get("/patient", isAuth, getAllPatient);
router.get("/patient/:id", getPatientById);
router.put("/patient/:id", updatePatient);
router.delete("/patient/:id", deletePatient);

router.post("/diagnostic", createDiagnostic);
router.get("/diagnostic", getAllDiagnostic);
router.get("/diagnostic/:id", getDiagnosticById);
router.put("/diagnostic/:id", updateDiagnostic);
router.delete("/diagnostic/:id", deleteDiagnostic);
// router.get("/diagnostic-stack", getDiagnosticStack);

export default router;
