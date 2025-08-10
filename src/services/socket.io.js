import { Server } from "socket.io";
// const stack = require('src/static/stack')

// Hold a reference to the socket.io instance once initialized
let ioInstance;

// Return the socket.io instance for use in other modules
const io = () => ioInstance;

// Initialize the socket.io server and store the instance
const init = (server) => {
  ioInstance = new Server(server, { cors: { origin: "*" } });
  ioInstance.on("connection", (socket) => {
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

  return ioInstance;
};

export default { io, init };
