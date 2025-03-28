     const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("MONGO_URI=mongodb+srv://HR_management:pHt4DicC4bMCjKoY@cluster0.mongodb.net/hrms?retryWrites=true&w=majority
PORT=5010
" );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
