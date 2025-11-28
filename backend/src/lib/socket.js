import { Server } from "socket.io";
import http from "http";
import express from "express";
import { disconnect } from "process";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// online users = active sockets
const userSocketMap = {};

io.on("connection", (userSocket) => {
  console.log("A user connected: " + userSocket.id);

  // map userId to socketId
  const userId = userSocket.handshake.query.userId;
  if (userId) userSocketMap[userId] = userSocket.id;

  // io.emit() to all users
  io.emit("onlineUsers", Object.keys(userSocketMap));

  userSocket.on("disconnect", () => {
    console.log("A user disconnected: " + userSocket.id);
    delete userSocketMap[userId];

    // io.emit() to all users
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
