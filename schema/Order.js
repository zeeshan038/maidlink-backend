const Joi = require("joi");

const orderSchema = Joi.object({
  ownerId: Joi.string().required().messages({
    "string.empty": "Owner ID is required.",
    "any.required": "Owner ID is a mandatory field.",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required.",
    "any.required": "Location is a mandatory field.",
  }),
  duration: Joi.string().required().messages({
    "string.empty": "Duration is required.",
    "any.required": "Duration is a mandatory field.",
  }),
  jobType: Joi.string().required().messages({
    "string.empty": "Job type is required.",
    "any.required": "Job type is a mandatory field.",
  }),
  charges: Joi.number().required().messages({
    "number.base": "Price must be a number.",
    "any.required": "Price is a mandatory field.",
  }),
  status: Joi.string()
    .valid("pending", "completed", "canceled")
    .default("pending")
    .messages({
      "any.only": "Status must be one of 'pending', 'completed', or 'canceled'.",
    }),
});

module.exports = { orderSchema };
