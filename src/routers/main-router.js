// const router = require("express").Router();
// const authenticationRouter = require("../modules/authentication/authentication.router");
// const managerRouter = require("../modules/manager/manager.router");
// const receptionRouter = require("../modules/reception/reception.router");
// const doctorRouter = require("../modules/doctor/doctor.router");
// const userRouter = require("../modules/user/user.router");
// const customerRouter = require("../modules/customer/customer.router");
import express from "express";
import authenticationRouter from "../modules/authentication/authentication.router.js";
import managerRouter from "../modules/manager/manager.router.js";
import receptionRouter from "../modules/reception/reception.router.js";
import doctorRouter from "../modules/doctor/doctor.router.js";
import userRouter from "../modules/user/user.router.js";
import customerRouter from "../modules/customer/customer.router.js";

const router = express.Router();
import { isAuth } from "../modules/authentication/authentication.middlewares.js";
import { isManager } from "../modules/manager/manager.middlewares.js";
import { isDoctor } from "../modules/doctor/doctor.middlewares.js";

router.use((req, res, next) => {
  console.log(req.method, req.url);
  return next();
});

router.get("/", (req, res) => {
  res.send(`APP IS RUNNING ON ${process.env.PORT}`);
});

router.get("/favicon.ico", () => {});
router.use("/login", authenticationRouter);
router.use("/customer", customerRouter);

router.use(isAuth);
router.use("/user", userRouter);
router.use("/doctor", isDoctor, doctorRouter);
router.use("/manager", isManager, managerRouter);
router.use("/reception", receptionRouter);

router.use((error, req, res, next) => {
  console.log(error);
  return res.status(error.code).send(error.message);
});

export default router;
