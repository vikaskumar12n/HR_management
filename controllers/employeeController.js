const Employee =require ('../models/Employee.js');


// Create Employee
const createEmployee = async (req, res) => {
  const { name, email, phone, resume, role, department } = req.body;

  if (!role || !department) {
    return res.status(400).json({ message: "Role and Department are required!" });
  }

  try {
    const newEmployee = await Employee.create({ name, email, phone, resume, role, department });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Employee
 const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.json({employee,message:"Employee Profile Updated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee
 const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports={createEmployee,getEmployees,updateEmployee,deleteEmployee}