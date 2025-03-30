const router = require("express").Router();

//paths
const otp = require("./owner");

// routes
router.use("/user", otp);


module.exports = router;
