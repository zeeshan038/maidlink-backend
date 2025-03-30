const express = require("express");
require("dotenv").config();
const app = express();

// Paths
const connectDB = require("./config/db");


//api Routes
const apiRoutes = require("./routes/index");

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

//Routes
app.use("/api", apiRoutes);


const PORT = process.env.PORT || 5000 ;
// Start the server
app.listen(3000 ,()=>{
    console.log(`Sever is working on ${PORT}`)
})
