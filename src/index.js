import express from "express";
import { createServer } from "http";
import cors from "cors";
import mainRouter from "./routers/main-router.js";
import dotenv from "dotenv";
import { connection } from "./models/index.js";
import * as socket from "./services/socket.io.js";

dotenv.config();

const app = express();
let server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const startServer = async () => {
  try {
    await connection.instance.getClient().authenticate();
    console.log("Database connected!");
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
    req.io = socket.getIo();
    return next();
  });
  app.use("/", mainRouter);
});
