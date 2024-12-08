import { Router } from "express";
import authenticationRouter from "../modules/authentication/authentication.router.js";
import managerRouter from "../modules/manager/manager.router.js";
import receptionRouter from "../modules/reception/reception.router.js";
import doctorRouter from "../modules/doctor/doctor.router.js";
import userRouter from "../modules/user/user.router.js";
import customerRouter from "../modules/customer/customer.router.js";
import { isAuth } from "../modules/authentication/authentication.middlewares.js";
import { isManager } from "../modules/manager/manager.middlewares.js";
import { isDoctor } from "../modules/doctor/doctor.middlewares.js";

const router = Router();

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

export default router;
