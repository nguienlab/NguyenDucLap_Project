const express = require("express");
const { createFeedback, getFeedbacks } = require("../controllers/feedback.controller");
const { protect, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(createFeedback);
router.route("/admin").get(protect, authorizeRoles("admin"), getFeedbacks);

module.exports = router;
