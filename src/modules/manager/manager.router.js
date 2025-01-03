import managerController from "../manager/manager.controllers.js";
import express from "express";
const router = express.Router();

router.post("/employees", managerController.createEmployee);
router.get("/employees", managerController.getAllEmployee);
router.get("/employees/:id", managerController.getEmployeeById);
router.put("/employees/:id", managerController.updateEmployee);
router.delete("/employees/:id", managerController.deleteEmployee);

router.put(
  "/medical-examination-fee",
  managerController.changeMedicalExaminationFee,
);
router.post("/medical-examination-fee", managerController.createService);
router.get("/medical-examination-fee", managerController.getAllService);

export default router;
