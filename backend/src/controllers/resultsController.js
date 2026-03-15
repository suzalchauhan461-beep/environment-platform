const Result = require('../models/Result');

const getUserResults = async (req, res) => {
  const results = await Result.find({ user: req.user._id })
    .populate('lesson', 'title slug')
    .populate('quiz', 'title durationMinutes')
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(results);
};

const getRecentResults = async (req, res) => {
  const results = await Result.find()
    .populate('user', 'name')
    .populate('lesson', 'title')
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(results);
};

module.exports = { getUserResults, getRecentResults };
