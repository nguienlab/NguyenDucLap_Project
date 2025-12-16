const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// All routes below are protected and restricted to admin
router.use(protect);
router.use(authorize('admin'));

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
