// import { Server } from "socket.io";

// let io;

// export default function handler(req, res) {
//   if (!io) {
//     const server = res.socket.server;
//     io = new Server(server);

//     io.on("connection", (socket) => {
//       console.log("A user connected");

//       socket.on("register", (username) => {
//         socket.username = username;
//       });

//       socket.on("chat message", (msg) => {
//         io.emit("chat message", { user: socket.username, message: msg });
//       });

//       socket.on("disconnect", () => {
//         console.log("A user disconnected");
//       });
//     });
//   }

//   res.socket.server.io = io;
//   res.end();
// }
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://vue-chat-room-pink.vercel.app", // Allow your Vue app's origin
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Chat server running');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle the username from the frontend
  socket.on('register', (username) => {
    socket.username = username; // Store the username in the socket
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { user: socket.username, message: msg });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});