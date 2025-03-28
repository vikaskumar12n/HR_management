const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("employee", "name email");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const markAttendance = async (req, res) => {
  try {
    const { employeeId, status, date, checkIn, checkOut } = req.body;

    if (!employeeId || !status || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      status,
      date,
      checkIn,
      checkOut
    });

    res.status(201).json({attendance,message:"Your attendance successfully add"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, checkIn, checkOut } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { status, checkIn, checkOut },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json({attendance,message:"update successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAttendance, markAttendance, updateAttendance, deleteAttendance };
