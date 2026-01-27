const Feedback = require("../models/Feedback");
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create new feedback
// @route   POST /api/v1/feedback
// @access  Public
exports.createFeedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.create(req.body);

  res.status(201).json({
    success: true,
    data: feedback,
  });
});

// @desc    Get all feedbacks
// @route   GET /api/v1/feedback/admin
// @access  Private (Admin)
exports.getFeedbacks = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find();

  res.status(200).json({
    success: true,
    data: feedbacks,
  });
});
