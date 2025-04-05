//NPM Packages
const bcrypt = require("bcrypt");

// utils
const sendOTP = require("../../utils/otpcode");

//models
const OTP = require("../../models/otp");

//Schema
const { passwordSchema } = require("../../schema/Owner");
//Models
const owner = require("../../models/owner");




/**
 * @desciption Forgot Password
 * @route POST /api/user/forgot-password
 * @access Public
 */

module.exports.forgotPassword = async (req, res) => {
  const { phone } = req.body;

  try {
    // Check if the user exists
    const user = await owner.findOne({ phone });
    if (!user) {
      return res.status(400).json({
        status: false,
        msg: "User not found",
      });
    }

    // Generate and send OTP
    const response = await sendOTP(phone);
    if (response.success) {
      // Store OTP in the database with an expiration time
      await OTP.create({ phone, otp: response.otp });

      return res.status(200).json({
        status: true,
        otp: response.otp,
        msg: "OTP sent successfully",
      });
    } else {
      return res.status(500).json({ message: response.message });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};

/**
 * @desciption Reset Password
 * @route PUT /api/user/reset-password
 * @access Public
 */
module.exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { phone } = req.params;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      status: false,
      msg: "All fields are required",
    });
  }
  if (newPassword.length < 6 || confirmPassword.length < 6) {
    return res.status(400).json({
      status: false,
      msg: "Password must be greater than 6 characters",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      status: false,
      msg: "Passwords do not match",
    });
  }

  try {
    const user = await owner.findOne({ phone });
    if (!user) {
      return res.status(400).json({
        status: false,
        msg: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await owner.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
      }
    );

    return res.status(200).json({
      status: true,
      msg: "Password reset successfull",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};

/**
 *  @description Change password
 *  @route PUT /api/user/change-password
 *  @access Private
 */
module.exports.changePassword = async (req, res) => {
  const { _id } = req.user;
  const payload = req.body;
  //Error Handling
  const result = passwordSchema(payload);
  if (result.error) {
    const errors = result.error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: false,
      msg: errors,
    });
  }

  console.log("pass", payload)
  try {
    const user = await owner.findById(_id).select("+password");

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not found",
      });
    }

    // Compare current password with the stored hashed password
    const matchPassword = await bcrypt.compare(payload.currentPassword, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        status: false,
        msg: "Invalid Current Password",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.newPassword, salt);

    // Update the user's password
    await owner.updateOne({ _id }, { password: hashedPassword });

    return res.status(200).json({
      status: true,
      msg: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};
