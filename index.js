const express = require("express");
require("dotenv").config();


const app = express();

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(express.json());


// API Routes
const apiRoutes = require("./routes/index");
app.use("/api", apiRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
