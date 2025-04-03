//NPM Packages
const express = require("express");
const router = express.Router();


//Controllers
const { createOder } = require("../controllers/order");


router.post("/create-order", createOder);


//Private routes


module.exports = router;
