import {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  changeMedicalExaminationFee,
} from "../manager/manager.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/employees", createEmployee);
router.get("/employees", getAllEmployee);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

router.put("/medical-examination-fee", changeMedicalExaminationFee);

export default router;
