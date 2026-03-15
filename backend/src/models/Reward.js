const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rewardPoints: { type: Number, default: 0 },
    badge: { type: String },
    level: { type: String },
    triggeredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reward', rewardSchema);
