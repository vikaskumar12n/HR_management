const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { getAttendance, markAttendance, updateAttendance, deleteAttendance } = require("../controllers/attendanceController");

router.get("/",getAttendance);
router.post("/",authenticate, markAttendance);
router.put("/:id",authenticate, updateAttendance);
router.delete("/:id",authenticate, deleteAttendance);

module.exports = router;
