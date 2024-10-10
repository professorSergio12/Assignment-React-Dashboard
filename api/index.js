import express from "express";
const app = express();

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//Routes
import authRoutes from "./routes/auth.route.js";

//Middlewares
app.use(express.json());
app.use(cookieParser());

//DATABSE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) => {
    console.log("Database is successfully connected");
  })
  .catch((err) => {
    console.log("Error occured while connecting to database", err);
  });

app.use("/api/auth", authRoutes);

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
