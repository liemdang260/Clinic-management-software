import { Server } from "socket.io";

let io;

const init = (server) => {
  io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected!`);
    });
    socket.on("hello", (data) => {
      console.log(data);
    });
    socket.on("start", (data) => {
      console.log(data);
    });
  });

  return io;
};

const getIO = () => io;

export default { init, getIO };
