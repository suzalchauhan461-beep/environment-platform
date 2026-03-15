const express = require('express');
const { protect } = require('../middleware/auth');
const { getUserRewards } = require('../controllers/rewardController');

const router = express.Router();

router.get('/me', protect, getUserRewards);

module.exports = router;
