//Models
const maid = require("../../models/maid")

/**
 * @desciption get all maids
 * @route POST /api/user/all-maids
 * @access Private
 */
module.exports.getAllMaids = async (req, res) => {

    try {
        const maids = await maid.find();
        if (!maids) {
            return res.status(400).json({
                status: false,
                msg: "User not found",
            });
        }
        return res.status(200).json({
            status: true,
            maids,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message,
        });
    }
};
