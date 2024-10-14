import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!io) {
    const server = res.socket.server;
    io = new Server(server);

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("register", (username) => {
        socket.username = username;
      });

      socket.on("chat message", (msg) => {
        io.emit("chat message", { user: socket.username, message: msg });
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  }

  res.socket.server.io = io;
  res.end();
}