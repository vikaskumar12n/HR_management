const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  createCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
  moveCandidateToEmployee,
  upload,
} = require("../controllers/candidateController");


router.post("/",authenticate, upload.single("resume"), createCandidate);
router.get("/", getCandidates);
router.put("/:id",authenticate, upload.single("resume"), updateCandidate);
router.delete("/:id",authenticate, deleteCandidate);
router.post("/move/:id",authenticate, moveCandidateToEmployee);

module.exports = router;
