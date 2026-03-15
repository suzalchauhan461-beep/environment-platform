const Reward = require('../models/Reward');

const getUserRewards = async (req, res) => {
  const rewards = await Reward.find({ user: req.user._id }).sort({ triggeredAt: -1 });
  res.json(rewards);
};

module.exports = { getUserRewards };
