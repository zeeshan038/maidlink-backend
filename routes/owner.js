//NPM Packages
const router = require("express").Router();

//Controllers
const { sendotp, verifyotp } = require('../controllers/Owner/otp')
const { register } = require('../controllers/Owner/registerowner')
const { login } = require('../controllers/Owner/loginowner')
const { forgotPassword, resetPassword, changePassword } = require('../controllers/Owner/passwordowner')
const { editProfile, getUserInfo, deleteUser, } = require('../controllers/Owner/profileowner')
const { getAllMaids } = require('../controllers/Owner/getmaids')

//middlwares
const verifyOwner = require("../middlewares/verifyOwner");
const upload = require("../utils/multer");

//Routes
router.post("/send-otp", sendotp);
router.post("/verify-otp", verifyotp);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:phone", resetPassword)
router.get("/all-maids", getAllMaids)

//middleware
router.use(verifyOwner);

router.put("/change-password", changePassword);
router.put("/edit-profile",
  upload.fields([
    { name: "profileImg", maxCount: 1 },

  ]),
  editProfile);
router.get('/get-user', getUserInfo);
router.delete("/delete-acc", deleteUser);

module.exports = router;
