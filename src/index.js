// const express = require("express");
// const { createServer } = require("http");
// const cors = require("cors");
// const mainRouter = require("./routers/main-router");
// const dotenv = require("dotenv");
// const { connectDB2 } = require("./connectDB/db");
// const { sequelize } = require("./models");
// const socket = require("./services/socket.io");
import express from "express";
import { createServer } from "http";
import cors from "cors";
import mainRouter from "./routers/main-router.js";
import dotenv from "dotenv";
import database from "./models/index.js";
import socket from "./services/socket.io.js";

dotenv.config();

const { sequelize } = database;
const app = express();
let server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync({ force: true });
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, (req, res) => {
      console.log(`APP RUNNING AT PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer().then(() => {
  socket.init(server);
  app.use((req, res, next) => {
    req.io = socket.io();
    return next();
  });
  app.use("/", mainRouter);
});
