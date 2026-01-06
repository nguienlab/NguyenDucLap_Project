const Feedback = require("../models/Feedback");

// @desc    Create new feedback
// @route   POST /api/v1/feedback
// @access  Public
exports.createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      success: true,
      data: feedback,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all feedbacks
// @route   GET /api/v1/feedback/admin
// @access  Private (Admin)
exports.getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find();

    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
