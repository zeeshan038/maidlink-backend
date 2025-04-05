const mongoose = require('mongoose')
const colors = require('colors')




const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database")
  }
  catch (error) {
    console.log(`Error in connection to Database ${error}`.bgBlack.white)
    console.log(error);
  }
}

module.exports = connectDb;














// NPM Package
// const mongoose = require("mongoose");

// const connectDb = async () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "MaidLink",
//     })
//     .then(() => {
//       console.log("Connection Created");
//     })
//     .catch((error) => {
//       console.log("Error ocurred while connecting DB", error);
//     });
// };

// module.exports = connectDb;