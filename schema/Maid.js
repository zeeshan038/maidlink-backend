// NPM Packages
const joi = require("joi")

//Signup Schma
module.exports.registerSchema = (payload) => {
  const schema = Joi.object({
    userName: Joi.string().required().messages({
      "string.empty": "userName is required.",
      "any.required": "userName is a mandatory field.",
    }),
    phone: Joi.string().required().messages({
      "string.empty": "Phone number is required.",
      "any.required": "Phone number  is a mandatory field.",
    }),
    serviceCity: Joi.string().required().messages({
        "string.empty": "service city is required.",
        "any.required": "Phone number  is a mandatory field.",
      }),
    profileImg: Joi.string().uri().messages({
      "string.uri": "Profile image must be a valid URL.",
    }),
    password: Joi.string().min(6).max(200).required().messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 200 characters.",
      "string.empty": "Password is required.",
      "any.required": "Password is a mandatory field.",
    })
  }).unknown(false);

  const result = schema.validate(payload);
  return result;
};