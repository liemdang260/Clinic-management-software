import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export class SocketIo {
  private static _instance: SocketIo;
  private client: Server | null = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new SocketIo();
    }
    return this._instance;
  }

  configure(server: HttpServer) {
    this.client = new Server(server, { cors: { origin: "*" } });

    this.client.on("connection", (socket) => {
      console.log(socket.id);
      socket.on("disconnect", () => {
        console.log(`${socket.id} is disconnected!`);
      });
      socket.on("hello", (data) => {
        console.log(data);
      });
    });
  }
}
