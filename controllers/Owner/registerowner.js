//NPM Packages
const bcrypt = require("bcrypt");

//Schema
const { registerSchema } = require("../../schema/Owner");
//Models
const owner = require("../../models/owner");



/**
 * @desciption regsiter home owner
 * @route POST /api/user/register
 * @access Public
 */

module.exports.register = async (req, res) => {
    const payload = req.body;

    //Error handling
    const result = registerSchema(payload);
    if (result.error) {
        const errors = result.error.details.map((detail) => detail.message);
        return res.status(400).json({
            status: false,
            msg: errors,
        });
    }

    try {
        const existingUser = await owner.findOne({ userName: payload.userName });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                msg: "User with this email already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);

        //Creating user
        await owner.create({
            name: payload.name,
            userName: payload.userName,
            email: payload.email,
            phone: payload.phone,
            password: hashedPassword,
            profileImg: payload.profileImg,
            role: payload.role,
            homeAddress: payload.homeAddress,
        });

        //Response
        return res.status(201).json({
            status: true,
            msg: "User Registered Successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            status: true,
            msg: error.message,
        });
    }
};