const Candidate = require("../models/Candidate");
const Employee = require("../models/Employee");
const multer = require("multer");
const fs = require("fs");

// Storage Setup for Resume Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//  Create Candidate
const createCandidate = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      resume: req.file ? req.file.filename : null,
    });

    res.status(201).json({candidate,message:"Candidate Profile successfully add "});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Candidate (Including Resume Update)
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    let updatedResume = candidate.resume;
    if (req.file) {
      // Delete old resume
      if (candidate.resume) {
        const oldResumePath = `uploads/${candidate.resume}`;
        if (fs.existsSync(oldResumePath)) {
          fs.unlinkSync(oldResumePath);
        }
      }
      updatedResume = req.file.filename;
    }

    candidate.name = name || candidate.name;
    candidate.email = email || candidate.email;
    candidate.phone = phone || candidate.phone;
    candidate.resume = updatedResume;

    const updatedCandidate = await candidate.save();
    res.json({updatedCandidate,message:"Candidate Profile successfully Update "});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete Candidate
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Delete resume file
    if (candidate.resume) {
      const resumePath = `uploads/${candidate.resume}`;
      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
      }
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Move Candidate to Employee
const moveCandidateToEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, department } = req.body;

    if (!role || !department) {
      return res.status(400).json({ message: "Role and Department are required!" });
    }

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Create Employee
    const newEmployee = await Employee.create({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      role,
      department,
      resume: candidate.resume || "",
    });

    // Remove candidate after moving
    await Candidate.findByIdAndDelete(id);
    res.status(201).json({newEmployee,message:"Candidate Hire Successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createCandidate, 
  getCandidates, 
  updateCandidate, 
  deleteCandidate, 
  moveCandidateToEmployee, 
  upload 
};
