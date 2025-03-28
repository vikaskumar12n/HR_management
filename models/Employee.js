const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, required: true }, 
  department: { type: String, required: true },
  resume: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
