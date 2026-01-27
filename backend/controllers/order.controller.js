const Order = require('../models/Order');
const Vehicle = require('../models/Vehicle');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (User or Admin)
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { items, shippingInfo } = req.body;

  if (!items || items.length === 0) {
    return next(new ErrorResponse('No order items provided', 400));
  }

  if (!shippingInfo || !shippingInfo.address || !shippingInfo.city || !shippingInfo.phoneNo || !shippingInfo.postalCode) {
    return next(new ErrorResponse('Please provide shipping information', 400));
  }

  let calculatedTotalPrice = 0;
  const orderItems = [];

  for (const item of items) {
      const vehicle = await Vehicle.findById(item.vehicle);
      if (!vehicle) {
          return next(new ErrorResponse(`Vehicle not found: ${item.vehicle}`, 404));
      }
      if (vehicle.quantity < item.quantity) {
          return next(new ErrorResponse(`Not enough stock for ${vehicle.name}. Only ${vehicle.quantity} left.`, 400));
      }
      
      orderItems.push({
          vehicle: vehicle._id,
          name: vehicle.name,
          image: vehicle.image,
          quantity: item.quantity,
          price: vehicle.price
      });
      calculatedTotalPrice += vehicle.price * item.quantity;

      vehicle.quantity -= item.quantity;
      await vehicle.save();
  }

  const order = await Order.create({
    user: req.user.id,
    orderItems,
    shippingInfo,
    totalPrice: calculatedTotalPrice,
  });

  res.status(201).json({ success: true, data: order });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    // Check if user is admin or the owner of the order
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
         return next(new ErrorResponse('Not authorized to view this order', 403));
    }

    res.status(200).json({ success: true, data: order });
});

// @desc    Update order (e.g., status)
// @route   PUT /api/orders/:id
// @access  Private (Admin)
exports.updateOrder = asyncHandler(async (req, res, next) => {
    // Only status can be updated by admin for now
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, {
        new: true,
        runValidators: true
    });

    if (!order) {
        return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: order });
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }
    
    // Note: This does not restore vehicle stock. A more complex implementation would be needed for that.
    await order.deleteOne();

    res.status(200).json({ success: true, data: {} });
});