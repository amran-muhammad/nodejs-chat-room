import { Server } from "socket.io";

export default function (req, res) {
  const io = new Server(res.socket.server);
  if (res.socket.server.io) {
    console.log("Socket is already running");
    return res.socket.server.io;
  }

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

  res.socket.server.io = io;
  return res.end();
}