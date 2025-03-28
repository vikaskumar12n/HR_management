const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.post("/register", createEmployee);
router.get("/",authenticate, getEmployees);
router.put("/:id",authenticate, updateEmployee);
router.delete("/:id",authenticate, deleteEmployee);

module.exports = router;
