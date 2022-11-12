import customerController from "./customer.controller.js";
import express from "express";
const router = express.Router();

router.post(
  "/appointment-request",
  customerController.createAppointmentRequest
);

export default router;
