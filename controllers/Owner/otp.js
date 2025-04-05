// utils
const sendOTP = require("../../utils/otpcode");

//models
const OTP = require("../../models/otp");


/**
 * @desciption Verify user phone no
 * @route POST /api/user/send-otp
 * @access Public
 */
module.exports.sendotp = async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ msg: "Phone number is required" });
    }

    try {
        const response = await sendOTP(phone);

        if (response.success) {
            // Store OTP in the database
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
        res.status(500).json({ msg: "Internal server error" });
    }
};

/**
 * @desciption  verify otp
 * @route POST /api/user/verify-otp
 * @access Public
 */
module.exports.verifyotp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ msg: "Phone and OTP are required" });
    }

    try {
        const validOTP = await OTP.findOne({ phone, otp });
        if (!validOTP) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }
        // otp got deleted once verfied
        await OTP.deleteOne({ phone });
        return res
            .status(200)
            .json({ status: true, msg: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};