const Vehicle = require('../models/Vehicle');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
exports.getVehicles = asyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { brand: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  let query = Vehicle.find({ ...keyword }).sort({ createdAt: -1 });

  if (req.query.limit) {
    query = query.limit(parseInt(req.query.limit));
  }

  const vehicles = await query;

  res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
});

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
exports.getVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: vehicle });
});

// @desc    Create new vehicle
// @route   POST /api/vehicles
// @access  Private (Admin)
exports.createVehicle = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload an image', 400));
  }

  const imageUrl = `/images/${req.file.filename}`;

  const vehicleData = {
    ...req.body,
    image: imageUrl,
  };

  const vehicle = await Vehicle.create(vehicleData);
  res.status(201).json({ success: true, data: vehicle });
});

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private (Admin or User)
exports.updateVehicle = asyncHandler(async (req, res, next) => {
  let vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
  }

  // If there's a new file, update the image path
  if (req.file) {
    const imageUrl = `/images/${req.file.filename}`;
    req.body.image = imageUrl;
  }

  vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  res.status(200).json({ success: true, data: vehicle });
});

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private (Admin or User with canDelete permission)
exports.deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
  }
  
  await vehicle.deleteOne();
  
  res.status(200).json({ success: true, data: {} });
});
