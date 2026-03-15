const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    text: { type: String, required: true },
    options: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    correctAnswer: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
