// import express from "express";
const express=require('express')
const  dotenv =require("dotenv") ;
const  connectDB =require("./config/db.js")
const  authRoutes =require("./routes/authRoutes.js") ;
const  cors =require("cors") ;

const leaveRoutes = require("./routes/leaveRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const attendanceRoutes = require("./routes/attendanceRoutes");
const employeeRoutes =require ("./routes/employeeRoutes.js");
const condidateRoute = require("./routes/candidateRoutes.js");


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(("uploads")));
app.use("/api/candidates",condidateRoute);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use(errorHandler);

app.use("/api/auth", authRoutes);
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
