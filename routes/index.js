const router = require("express").Router();

//paths
const owner = require("./owner");
const maid = require("./maid");
const order = require("./order");

// routes
router.use("/user", owner);
router.use("/maid", maid);
router.use("/order", order);

module.exports = router;
