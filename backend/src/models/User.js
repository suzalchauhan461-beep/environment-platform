const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    rewardPoints: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    level: { type: String, default: 'Beginner Explorer' },
    learningStreak: { type: Number, default: 0 },
    lessonsCompleted: { type: Number, default: 0 },
    quizAccuracy: { type: Number, default: 0 },
    timeSpentMinutes: { type: Number, default: 0 },
    leaderboardPosition: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
