import express from "express";
const app = express();

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import Child from "./models/Child.model.js";

//Middlewares
app.use(express.json());
app.use(cookieParser());

//DATABSE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database is successfully connected");

    // Insert the new data
    // const childrenData = [
    //   // 26 registered entries
    //   { name: "Rohan", status: "registered", enrollmentYear: 2021 },
    //   { name: "Johan", status: "registered", enrollmentYear: 2020 },
    //   { name: "Mohan", status: "registered", enrollmentYear: 2022 },
    //   { name: "Sohan", status: "registered", enrollmentYear: 2021 },
    //   { name: "Gohan", status: "registered", enrollmentYear: 2019 },
    //   { name: "Ram", status: "registered", enrollmentYear: 2020 },
    //   { name: "Shyam", status: "registered", enrollmentYear: 2021 },
    //   { name: "Ravi", status: "registered", enrollmentYear: 2020 },
    //   { name: "Kavi", status: "registered", enrollmentYear: 2019 },
    //   { name: "Amit", status: "registered", enrollmentYear: 2021 },
    //   { name: "Sumit", status: "registered", enrollmentYear: 2022 },
    //   { name: "Manoj", status: "registered", enrollmentYear: 2023 },
    //   { name: "Anuj", status: "registered", enrollmentYear: 2022 },
    //   { name: "Dinesh", status: "registered", enrollmentYear: 2020 },
    //   { name: "Rakesh", status: "registered", enrollmentYear: 2021 },
    //   { name: "Mukesh", status: "registered", enrollmentYear: 2022 },
    //   { name: "Suresh", status: "registered", enrollmentYear: 2019 },
    //   { name: "Naveen", status: "registered", enrollmentYear: 2023 },
    //   { name: "Tarun", status: "registered", enrollmentYear: 2021 },
    //   { name: "Aakash", status: "registered", enrollmentYear: 2020 },
    //   { name: "Vikas", status: "registered", enrollmentYear: 2022 },
    //   { name: "Vipin", status: "registered", enrollmentYear: 2023 },
    //   { name: "Aman", status: "registered", enrollmentYear: 2020 },
    //   { name: "Bharat", status: "registered", enrollmentYear: 2022 },
    //   { name: "Harsh", status: "registered", enrollmentYear: 2019 },
    //   { name: "Yash", status: "registered", enrollmentYear: 2023 },
    
    //   // 120 active entries
    //   { name: "Arun", status: "active", enrollmentYear: 2020 },
    //   { name: "Bhanu", status: "active", enrollmentYear: 2022 },
    //   { name: "Chirag", status: "active", enrollmentYear: 2021 },
    //   { name: "Dev", status: "active", enrollmentYear: 2020 },
    //   { name: "Eshaan", status: "active", enrollmentYear: 2022 },
    //   { name: "Farhan", status: "active", enrollmentYear: 2019 },
    //   { name: "Ganesh", status: "active", enrollmentYear: 2023 },
    //   { name: "Hari", status: "active", enrollmentYear: 2022 },
    //   { name: "Ishan", status: "active", enrollmentYear: 2021 },
    //   { name: "Jitesh", status: "active", enrollmentYear: 2019 },
    //   { name: "Kabir", status: "active", enrollmentYear: 2020 },
    //   { name: "Lakshay", status: "active", enrollmentYear: 2023 },
    //   { name: "Manish", status: "active", enrollmentYear: 2022 },
    //   { name: "Nishant", status: "active", enrollmentYear: 2020 },
    //   { name: "Om", status: "active", enrollmentYear: 2021 },
    //   { name: "Pranav", status: "active", enrollmentYear: 2022 },
    //   { name: "Raj", status: "active", enrollmentYear: 2023 },
    //   { name: "Shiv", status: "active", enrollmentYear: 2020 },
    //   { name: "Tushar", status: "active", enrollmentYear: 2022 },
    //   { name: "Uday", status: "active", enrollmentYear: 2021 },
    //   { name: "Veer", status: "active", enrollmentYear: 2019 },
    //   { name: "Yuvraj", status: "active", enrollmentYear: 2023 },
    //   { name: "Zaid", status: "active", enrollmentYear: 2020 },
    //   // More active entries
    //   // (repeated or add unique names as necessary until reaching 120 active entries)
    
    //   // 50 inactive entries
    //   { name: "Ankit", status: "inactive", enrollmentYear: 2021 },
    //   { name: "Bhavesh", status: "inactive", enrollmentYear: 2020 },
    //   { name: "Chetan", status: "inactive", enrollmentYear: 2022 },
    //   { name: "Deepak", status: "inactive", enrollmentYear: 2021 },
    //   { name: "Feroz", status: "inactive", enrollmentYear: 2019 },
    //   { name: "Gautam", status: "inactive", enrollmentYear: 2022 },
    //   { name: "Hitesh", status: "inactive", enrollmentYear: 2023 },
    //   { name: "Irfan", status: "inactive", enrollmentYear: 2020 },
    //   { name: "Jay", status: "inactive", enrollmentYear: 2021 },
    //   { name: "Karan", status: "inactive", enrollmentYear: 2019 },
    //   { name: "Lalit", status: "inactive", enrollmentYear: 2022 },
    //   { name: "Mithun", status: "inactive", enrollmentYear: 2020 },
    //   { name: "Nitin", status: "inactive", enrollmentYear: 2023 },
    //   { name: "Ojas", status: "inactive", enrollmentYear: 2021 },
    //   { name: "Parth", status: "inactive", enrollmentYear: 2019 },
    //   { name: "Rajat", status: "inactive", enrollmentYear: 2020 },
    //   { name: "Sandeep", status: "inactive", enrollmentYear: 2021 },
    //   { name: "Tejas", status: "inactive", enrollmentYear: 2022 },
    //   { name: "Utkarsh", status: "inactive", enrollmentYear: 2019 },
    //   { name: "Vinay", status: "inactive", enrollmentYear: 2023 },
    //   { name: "Yogesh", status: "inactive", enrollmentYear: 2020 },
    //   // More inactive entries
    //   // (repeat or add unique names as necessary until reaching 50 inactive entries)
    // ];
    

    // Child.insertMany(childrenData)
    //   .then(() => {
    //     console.log("Children data inserted successfully.");
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
