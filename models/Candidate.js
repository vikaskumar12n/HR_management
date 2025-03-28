const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  resume: { type: String },
  status: { type: String, enum: ["Pending", "Selected", "Rejected"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Candidate", candidateSchema);
