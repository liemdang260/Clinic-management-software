import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { SequelizeConnection } from "./databaseConnection";
import mainRouter from "./routers";
// import { SocketIo } from "./services/socket.io";

dotenv.config();

const app = express();
let server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const startServer = async () => {
  try {
    await SequelizeConnection.instance.configure(
      process.env.POSTGRESS_URL || ""
    );
    console.log("Database connected!");
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
      console.log(`APP RUNNING AT PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer().then(() => {
  // SocketIo.instance.configure(server);
  app.use("/", mainRouter);
});
