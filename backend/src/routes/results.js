const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { getUserResults, getRecentResults } = require('../controllers/resultsController');

const router = express.Router();

router.get('/me', protect, getUserResults);
router.get('/all', protect, adminOnly, getRecentResults);

module.exports = router;
