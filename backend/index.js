import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "../backend/routes/todo.routes.js";
import userRoutes from "../backend/routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;

const DB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.Frontend_URL,
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database Connection Code
try {
  mongoose.connect(DB_URI);
  console.log("Connected to MongoDb");
} catch (error) {
  console.log(error);
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
