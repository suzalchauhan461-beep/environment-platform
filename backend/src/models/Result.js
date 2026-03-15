const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    accuracy: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    correctCount: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    durationSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
