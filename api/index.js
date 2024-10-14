import express from "express";
const app = express();

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import Financial from "./models/financial.model.js";

//Middlewares
app.use(express.json());
app.use(cookieParser());

//DATABSE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database is successfully connected");

    // const sampleData = [
    //   { date: new Date(), revenue: 500, expenses: 50 },
    //   { date: new Date(), revenue: 600, expenses: 70 },
    //   { date: new Date(), revenue: 700, expenses: 80 },
    //   { date: new Date(), revenue: 384, expenses: 48 },
    //   { date: new Date(), revenue: 400, expenses: 100 },
    // ];

    // Financial.insertMany(sampleData)
    //   .then(() => {
    //     console.log("Care Giver data inserted successfully.");
    //   })
    //   .catch((err) => {
    //     console.log("Error inserting children data:", err);
    //   })
    //   .finally(() => {
    //     mongoose.connection.close();
    //   });
  })
  .catch((err) => {
    console.log("Error occurred while connecting to the database:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

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
