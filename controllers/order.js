//Schemas
const order = require("../models/order");
const { orderSchema } = require("../schema/Order");

/**
 * @desciption regsiter home owner
 * @route POST /api/user/register
 * @access Public
 */
module.exports.createOder = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  //Error Handling
  const result = orderSchema(payload);
  if (result.error) {
    const errors = result.error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: false,
      msg: errors,
    });
  }
  try {
    const order = await order.create({
      ownerId: id,
      location: payload.location,
      duration: payload.duration,
      jobType: payload.jobType,
      charges: payload.jobType,
      status: payload.status,
    });
    return res.status(201).json({
        status : true ,
        msg : "Order created successfully!"
    })
  } catch (error) {
    return res.status(500).json({
        status : false ,
        msg : error.message
    })
  }
};
