const express = require('express');
const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// All routes below are protected
router.use(protect);

// Route for a user to get their own orders
router.route('/my-orders').get(getMyOrders);

// Admin routes
router
  .route('/')
  .get(authorize('admin'), getAllOrders)
  .post(authorize('customer'), createOrder);

router
  .route('/:id')
  .get(getOrderById) // Controller will check for ownership or admin role
  .put(authorize('admin'), updateOrder)
  .delete(authorize('admin'), deleteOrder);

module.exports = router;
