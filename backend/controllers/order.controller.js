const Order = require('../models/Order');
const Vehicle = require('../models/Vehicle');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (User or Admin)
exports.createOrder = async (req, res, next) => {
  // The request body should be an array of objects: { vehicle: "vehicleId", quantity: 1 }
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items provided' });
  }

  try {
    let calculatedTotalPrice = 0;
    const orderItems = [];

    // Note: Without a transaction, these operations are not atomic.
    // This is a tradeoff for compatibility with standalone MongoDB instances.
    for (const item of items) {
        const vehicle = await Vehicle.findById(item.vehicle);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: `Vehicle not found: ${item.vehicle}` });
        }
        if (vehicle.quantity < item.quantity) {
            return res.status(400).json({ success: false, message: `Not enough stock for ${vehicle.name}. Only ${vehicle.quantity} left.` });
        }
        
        // Add to order items and calculate price
        orderItems.push({
            vehicle: vehicle._id,
            name: vehicle.name, // Store name and image for easier display
            image: vehicle.image,
            quantity: item.quantity,
            price: vehicle.price // Price at time of purchase
        });
        calculatedTotalPrice += vehicle.price * item.quantity;

        // Decrease stock
        vehicle.quantity -= item.quantity;
        await vehicle.save();
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      totalPrice: calculatedTotalPrice,
    });

    res.status(201).json({ success: true, data: order });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user is admin or the owner of the order
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
             return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update order (e.g., status)
// @route   PUT /api/orders/:id
// @access  Private (Admin)
exports.updateOrder = async (req, res, next) => {
    try {
        // Only status can be updated by admin for now
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(req.params.id, { status }, {
            new: true,
            runValidators: true
        });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        // Note: This does not restore vehicle stock. A more complex implementation would be needed for that.
        await order.remove();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};