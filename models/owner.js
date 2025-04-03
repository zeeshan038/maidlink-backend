//NPM Pacakages
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone :{
      type : Number , 
      reuuired : true
    },
    profileImg: { type: String, default: "" },
    password: {
      type: String,
      required: true,
      select: false,
      minlenght: [6, "Password must be at least 6 characters"],
      maxlength: [200, "Password cannot excede 200 characters"],
    },
    homeAddress: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Owner", ownerSchema);
