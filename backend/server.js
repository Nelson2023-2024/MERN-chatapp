import { configDotenv } from "dotenv";
import express from "express";
import { authRoutes } from "./routes/authRoutes.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";

configDotenv();

const app = express();
const PORT = process.env.PORT;

//extract file from json body
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});
