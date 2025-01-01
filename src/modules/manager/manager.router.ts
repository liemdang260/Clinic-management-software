import { Router } from "express";
import {
  changeMedicalExaminationFee,
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
} from "./manager.controllers";

const router = Router();

router.post("/employees", createEmployee);
router.get("/employees", getAllEmployee);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

router.put("/medical-examination-fee", changeMedicalExaminationFee);

export default router;
