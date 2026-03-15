const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

const getAdminMetrics = async (req, res) => {
  const lessonCount = await Lesson.countDocuments();
  const quizCount = await Quiz.countDocuments();
  const userCount = await User.countDocuments();
  const resultCount = await Result.countDocuments();
  res.json({
    lessonCount,
    quizCount,
    userCount,
    resultCount,
  });
};

const listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

module.exports = { getAdminMetrics, listUsers };
