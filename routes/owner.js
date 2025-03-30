//NPM Packages
const router = require("express").Router();

//Controllers
const { sendotp, verifyotp, register, login, forgotPassword, resetPassword, changePassword, editProfile, getUserInfo, deleteUser } = require("../controllers/owner");
//middlwares
const verifyOwner = require("../middlewares/verifyOwner");

//Routes
router.post("/send-otp", sendotp);
router.post("/verify-otp" , verifyotp);
router.post("/register" , register);
router.post("/login",login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:phone" , resetPassword)

//middleware
router.use(verifyOwner);

router.put("/change-password", changePassword);
router.put("/edit-profile", editProfile);
router.get('/get-user' , getUserInfo);
router.delete("/delete-acc" , deleteUser);

module.exports = router;
