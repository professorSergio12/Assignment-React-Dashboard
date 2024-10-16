import express from "express";
const app = express();

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

//Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

//Middlewares
app.use(express.json());
app.use(cookieParser());

//DATABSE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database is successfully connected");
  })
  .catch((err) => {
    console.log("Error occurred while connecting to the database:", err);
  });


const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is successfull started");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
