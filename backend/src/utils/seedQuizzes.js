require('dotenv').config();
const connectDB = require('../config/db');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const generateOptions = (base, idx) => [
  { label: 'A', value: `${base} A` },
  { label: 'B', value: `${base} B` },
  { label: 'C', value: `${base} C` },
  { label: 'D', value: `${base} D` },
];

const seed = async () => {
  await connectDB();
  await Quiz.deleteMany({});
  await Question.deleteMany({});
  const lessons = await Lesson.find();
  for (const lesson of lessons) {
    const quiz = await Quiz.create({
      lesson: lesson._id,
      title: `${lesson.title} Quiz`,
      durationMinutes: 35,
    });
    const questions = [];
    for (let i = 1; i <= 40; i++) {
      const text = `Question ${i} for ${lesson.title} covering ${lesson.topic}.`;
      const options = generateOptions(lesson.title, i);
      const correctAnswer = options[i % 4].value;
      questions.push({
        quiz: quiz._id,
        text,
        options,
        correctAnswer,
      });
    }
    const saved = await Question.insertMany(questions);
    quiz.questions = saved.map((question) => question._id);
    await quiz.save();
    console.log(`Seeded quiz for lesson ${lesson.title}`);
  }
  process.exit(0);
};

seed().catch((error) => {
  console.error('Quiz seed failed', error);
  process.exit(1);
});
