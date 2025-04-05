//NPM Packages
const bcrypt = require("bcrypt");

//Schema
const { loginSchema } = require("../../schema/Owner");
//Models
const owner = require("../../models/owner");

//utils
const genrateToken = require("../../utils/genrateToken");


/**
 * @desciption login owner
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
        const validUser = await owner
            .findOne({ userName: payload.userName })
            .select("password");
        if (!validUser) {
            return res.status(401).json({
                status: false,
                msg: "userName  or Password is incorrect",
            });
        }


        const user = await owner.findOne({ userName: payload.userName });

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