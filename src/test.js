import socket from "./services/socket.io.js";
import { createServer } from "http";

async function test() {
  const httpServer = createServer();
  await new Promise((resolve) => httpServer.listen(0, resolve));
  const ioServer = socket.init(httpServer);
  if (socket.io() !== ioServer) {
    throw new Error("Socket.io instance was not initialized correctly");
  }
  console.log("Socket.io service initialized correctly");
  ioServer.close();
  httpServer.close();
}

test();
