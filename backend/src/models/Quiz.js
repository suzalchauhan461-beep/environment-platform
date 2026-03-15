const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    title: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    durationMinutes: { type: Number, default: 35 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
