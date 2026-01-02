const express = require("express");
const { createFeedback } = require("../controllers/feedback.controller");

const router = express.Router();

router.route("/").post(createFeedback);

module.exports = router;
