//NPM Pacakages
const mongoose = require("mongoose");

const maidSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    phone :{
      type : Number , 
      reuuired : true
    },
    serviceCity: {
        type : "String",
        requird : true 
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlenght: [6, "Password must be at least 6 characters"],
      maxlength: [200, "Password cannot excede 200 characters"],
    },
    experience : {
        type : Number , 
        reuuired : true
    },
    ratePerHour : {
        type : Number , 
        reuuired : true
    },
    availability : {
        type : [String],
        required : true
    },
    services:{
      type: [String], 
      default: []
    },
    profileImg:{ type: String, default: "" },
    cnic: {
        type: String, default: ""
    },
    criminalRecordCertificate: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Maid", maidSchema);
