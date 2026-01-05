const express = require('express');
const {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicle.controller');

const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router
  .route('/')
  .get(getVehicles)
  .post(protect, authorize('admin'), upload, createVehicle);

router
  .route('/:id')
  .get(getVehicle)
  .put(protect, authorize('admin'), updateVehicle)
  .delete(protect, authorize('admin'), deleteVehicle);

module.exports = router;
