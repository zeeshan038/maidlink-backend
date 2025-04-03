const router = require("express").Router();

//paths
const owner = require("./owner");
const maid = require("./maid");


// routes
router.use("/user", owner);
router.use("/maid", maid);


module.exports = router;
