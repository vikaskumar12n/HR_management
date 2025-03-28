const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// Get all leave requests
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "name email");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a leave request
const createLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, reason, status } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const leave = new Leave({ employee: employeeId, startDate, endDate, reason, status });
    await leave.save();
    res.status(201).json({leave,message:"Leave Application Submited Successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a leave request
const updateLeave = async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({updatedLeave,message:"leave request updated successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a leave request
const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: "Leave request deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Export functions using CommonJS
module.exports = {
  getAllLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
};
