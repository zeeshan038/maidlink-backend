const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

//Controllers
const { register } = require("../controllers/Maid/registermaid")
const { login } = require("../controllers/Maid/loginmaid")
const { forgotPassword, resetPassword, changePassword } = require("../controllers/Maid/passwordmaid")
const { editProfile, getUserInfo, deleteUser } = require("../controllers/Maid/profilemaid")

//Middleware
const verifyMaid = require("../middlewares/verifyMaid");
const { verifyotp } = require("../controllers/Owner/otp");

router.post(
  "/register",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "cnic", maxCount: 1 },
    { name: "criminalRecordCertificate", maxCount: 1 },
  ]),
  register
);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyotp);
router.put("/reset-password/:phone", resetPassword);

//Private routes
router.use(verifyMaid);
router.put("/change-password", changePassword);
router.put(
  "/edit-profile",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "cnic", maxCount: 1 },
    { name: "criminalRecordCertificate", maxCount: 1 },
  ]),
  editProfile
);
router.get("/get-user", getUserInfo);
router.delete("/delete-acc", deleteUser);

module.exports = router;
