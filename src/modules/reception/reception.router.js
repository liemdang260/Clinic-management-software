import receptionController from "../reception/reception.controllers.js";
import { isAuth } from "../authentication/authentication.middlewares.js";
import express from "express";
const router = express.Router();

router.post("/appointment", receptionController.createAppointment);
router.get("/appointment", receptionController.getAllAppointment);
router.get("/appointment/:id", receptionController.getAppointmentById);
router.post("/appointment-by-week", receptionController.getAppointmentByWeek);
// router.get('/appointment',receptionController.getAppointmentInDay)
router.put("/appointment/:id", receptionController.updateAppointment);
router.delete("/appointment/:id", receptionController.deleteAppointment);

router.get("/appointment-request", receptionController.getAppointmentRequest);
router.put(
  "/appointment-request/:id",
  receptionController.updateAppointmentStatus
);
router.get("/diagnostic-stack", receptionController.getDiagnosticStack);

router.post("/patient", receptionController.createPatient);
router.get("/patient", isAuth, receptionController.getAllPatient);
router.get("/patient/:id", receptionController.getPatientById);
router.put("/patient/:id", receptionController.updatePatient);
router.delete("/patient/:id", receptionController.deletePatient);

router.post("/diagnostic", receptionController.createDiagnostic);
router.get("/diagnostic", receptionController.getAllDiagnostic);
router.get("/diagnostic/:id", receptionController.getDiagnosticById);
router.put("/diagnostic/:id", receptionController.updateDiagnostic);
router.delete("/diagnostic/:id", receptionController.deleteDiagnostic);
router.get("/diagnostic-stack", receptionController.getDiagnosticStack);

export default router;
