//NPM Packages
const bcrypt = require("bcrypt");

//utils
const { uploadFile } = require("../../utils/cloudnary");

//Models
const Maid = require("../../models/maid");

//Schama
const { registerSchema } = require("../../schema/Maid");



/**
 * @desciption maid registeration
 * @route POST /api/user/register
 * @access Public
 */
module.exports.register = async (req, res) => {
    const payload = req.body;

    // Ensure services is an array
    if (typeof payload.services === "string") {
        try {
            payload.services = JSON.parse(payload.services);
        } catch (error) {
            return res
                .status(400)
                .json({ status: false, msg: "Invalid services format" });
        }
    }

    // Validate input data
    const result = registerSchema.validate(payload);
    if (result.error) {
        const errors = result.error.details.map((detail) => detail.message);
        return res.status(400).json({ status: false, msg: errors });
    }

    try {
        // Check if user already exists
        const existingUser = await Maid.findOne({ userName: payload.userName });
        if (existingUser) {
            return res
                .status(400)
                .json({ status: false, msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        // Check and upload profile image if it exists
        //let profileImgUrl = "";
        if (req.files?.profileImg?.[0]) {
            profileImgUrl = await uploadFile(req.files.profileImg[0].path);
        }
        console.log("profile Image", profileImgUrl);


        // Similarly check for other files
        if (req.files?.cnic?.[0]) {
            cnicUrl = await uploadFile(req.files.cnic[0].path);
            console.log("cnic", cnicUrl);
        }



        // let criminalRecordUrl = "";
        if (req.files?.criminalRecordCertificate?.[0]) {
            criminalRecordUrl = await uploadFile(
                req.files.criminalRecordCertificate[0].path
            );
        }
        console.log("criminal Record", criminalRecordUrl);

        // Save user to database
        await Maid.create({
            userName: payload.userName,
            email: payload.email,
            phone: payload.phone,
            password: hashedPassword,
            serviceCity: payload.serviceCity,
            experience: payload.experience,
            ratePerHour: payload.ratePerHour,
            availability: payload.availability,
            services: payload.services,
            profileImg: profileImgUrl,
            cnic: cnicUrl,
            role: payload.role,
            criminalRecordCertificate: criminalRecordUrl,
        });

        return res
            .status(201)
            .json({
                status: true,
                msg: "Maid Registered Successfully!"
            });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message
        });
    }
};
