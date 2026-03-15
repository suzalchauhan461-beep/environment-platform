const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    keyPoints: { type: [String], default: [] },
    durationMinutes: { type: Number, default: 15 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
