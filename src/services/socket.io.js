import { Server } from "socket.io";
// const stack = require('src/static/stack')

const io = () => {
  return io;
};

const init = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });
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

export default { io, init };
