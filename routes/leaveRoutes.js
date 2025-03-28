const express = require("express");
const router = express.Router();
const {getAllLeaves,createLeave,updateLeave,deleteLeave}=require('../controllers/leaveController')
const authenticate = require("../middleware/authMiddleware");

router.get("/", getAllLeaves);
router.post("/",authenticate,createLeave);
router.put("/:id",authenticate,updateLeave);
router.delete("/:id",authenticate,deleteLeave);

module.exports = router;
