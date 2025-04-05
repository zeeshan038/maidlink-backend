//utils
const { uploadFile } = require("../../utils/cloudnary");

//Models
const Maid = require("../../models/maid");

//Schama
const { maidSchema } = require("../../schema/Maid");


/**
 *  @description Update Profile
 *  @route PUT /api/user/edit-profile
 *  @access Private
 */
module.exports.editProfile = async (req, res) => {
    const { _id } = req.maid;
    let payload = req.body;

    // Upload new images if provided
    try {
        if (req.files?.profileImg?.[0]) {
            payload.profileImg = await uploadFile(req.files.profileImg[0].path);
        }

        if (req.files?.cnic?.[0]) {
            payload.cnic = await uploadFile(req.files.cnic[0].path);
        }

        if (req.files?.criminalRecordCertificate?.[0]) {
            payload.criminalRecordCertificate = await uploadFile(
                req.files.criminalRecordCertificate[0].path
            );
        }
    } catch (uploadError) {
        return res.status(500).json({
            status: false,
            msg: "Error uploading files",
        });
    }
    // Validate updated data
    const result = maidSchema(payload);
    if (result.error) {
        const errors = result.error.details.map((detail) => detail.message);
        return res.status(400).json({
            status: false,
            msg: errors,
        });
    }

    try {
        // Update maid profile
        await Maid.updateOne({ _id }, { $set: payload });

        return res.status(200).json({
            status: true,
            msg: "Profile Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: error.message,
        });
    }
};


/**
 *  @description get user info
 *  @route GET /api/user/user-info
 *  @access Private
 */

module.exports.getUserInfo = async (req, res) => {
    const { _id } = req.maid;

    try {
        const user = await Maid.findById(_id);
        if (!user) {
            return res.status(400).json({
                status: false,
                msg: "User not found",
            });
        }
        return res.status(200).json({
            status: true,
            userInfo: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message,
        });
    }
};

/**
 *  @description delete user
 *  @route PUT /api/user/delete-user
 *  @access Private
 */

module.exports.deleteUser = async (req, res) => {
    const { _id } = req.maid;
    try {
        const user = await Maid.findByIdAndDelete(_id);
        if (!user) {
            return res.status(400).json({
                status: false,
                msg: "User not found",
            });
        }
        return res.status(200).json({
            status: true,
            msg: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message,
        });
    }
};
