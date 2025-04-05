//NPM Packages
const bcrypt = require("bcrypt");

//Models
const Maid = require("../../models/maid");

//Schama
const { loginSchema } = require("../../schema/Maid");
const genrateToken = require("../../utils/genrateToken");





/**
 * @desciption login maid
 * @route POST /api/user/login
 * @access Public
 */
module.exports.login = async (req, res) => {
    const payload = req.body;

    //Error Handling
    const result = loginSchema(payload);
    if (result.error) {
        const errors = result.error.details.map((detail) => detail.message);
        return res.status(400).json({
            status: false,
            msg: errors,
        });
    }

    try {
        //Checking valid user
        const validUser = await Maid.findOne({ userName: payload.userName }).select(
            "password"
        );

        const user = await Maid.findOne({ userName: payload.userName });


        if (!validUser) {
            return res.status(401).json({
                status: false,
                msg: "userName  or Password is incorrect",
            });
        }

        //Checking password
        const validPassword = await bcrypt.compareSync(
            payload.password,
            validUser.password
        );
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                msg: "Email or Password is incorrect",
            });
        }

        const token = genrateToken(validUser._id);

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
            })
            .json({
                status: true,
                message: "User Logged In Successfully!",
                role: user.role,
                id: validUser._id,
                token,
            });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message,
        });
    }
};