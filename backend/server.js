import { configDotenv } from "dotenv";
import express from "express";
import { authRoutes } from "./routes/authRoutes.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import { messageRoutes } from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoute.js";
import { app, server } from "./socket/socket.js";

configDotenv();

const PORT = process.env.PORT;

//extract file from json body
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});
