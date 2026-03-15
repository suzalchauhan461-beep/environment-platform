const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { getAdminMetrics, listUsers } = require('../controllers/adminController');

const router = express.Router();

router.get('/metrics', protect, adminOnly, getAdminMetrics);
router.get('/users', protect, adminOnly, listUsers);

module.exports = router;
