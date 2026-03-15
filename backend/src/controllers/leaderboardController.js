const Leaderboard = require('../models/Leaderboard');

const getLeaderboard = async (req, res) => {
  const entries = await Leaderboard.find()
    .populate('user', 'name level rewardPoints')
    .sort({ totalPoints: -1 });
  res.json(entries);
};

module.exports = { getLeaderboard };
