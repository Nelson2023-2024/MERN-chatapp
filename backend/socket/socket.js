import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // userId: socketId

// Listen for connections
io.on("connection", (socket) => {
  console.log(`a user connected`, socket.id);

  // Retrieve userId from the connection query
  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  // Broadcast the online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`user disconnected`, socket.id);
    delete userSocketMap[userId];

    // Broadcast the updated online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export the app and server
export { app, io, server };
