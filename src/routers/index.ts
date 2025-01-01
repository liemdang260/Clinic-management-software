import { Router } from "express";
import authenticationRouter from "../modules/authentication/authentication.router";
import managerRouter from "../modules/manager/manager.router";
import receptionRouter from "../modules/reception/reception.router";
import doctorRouter from "../modules/doctor/doctor.router";
import userRouter from "../modules/user/user.router";
import { isAuth } from "../modules/authentication/authentication.middlewares";
import { isManager } from "../modules/manager/manager.middlewares";
import { isDoctor } from "../modules/doctor/doctor.middlewares";

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
// router.use("/customer", customerRouter);

router.use(isAuth);
router.use("/user", userRouter);
router.use("/doctor", isDoctor, doctorRouter);
router.use("/manager", isManager, managerRouter);
router.use("/reception", receptionRouter);

export default router;
