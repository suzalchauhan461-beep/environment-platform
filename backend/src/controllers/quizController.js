const Quiz = require('../models/Quiz');
const Lesson = require('../models/Lesson');
const Question = require('../models/Question');
const Result = require('../models/Result');
const User = require('../models/User');
const Reward = require('../models/Reward');
const Leaderboard = require('../models/Leaderboard');

const rewardByAccuracy = (accuracy) => {
  if (accuracy >= 100) return 100;
  if (accuracy >= 90) return 90;
  if (accuracy >= 80) return 80;
  if (accuracy >= 50) return 50;
  return 20;
};

const badgeByAccuracy = (accuracy) => {
  if (accuracy >= 100) return 'Earth Guardian';
  if (accuracy >= 90) return 'Nature Protector';
  if (accuracy >= 80) return 'Eco Warrior';
  if (accuracy >= 50) return 'Eco Learner';
  return 'Beginner Explorer';
};

const getQuizForLesson = async (req, res) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug });
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  const quiz = await Quiz.findOne({ lesson: lesson._id }).populate({
    path: 'questions',
    select: 'text options',
  });
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not created for this lesson yet' });
  }
  res.json({ lesson, quiz });
};

const submitQuiz = async (req, res) => {
  const { answers = {}, durationSeconds = 0 } = req.body;
  const quiz = await Quiz.findById(req.params.id).populate('questions');
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  let correct = 0;
  quiz.questions.forEach((question) => {
    const userAnswer = answers[question._id] || answers[question._id.toString()];
    if (userAnswer && userAnswer === question.correctAnswer) {
      correct += 1;
    }
  });
  const total = quiz.questions.length;
  const accuracy = Math.round((correct / total) * 100);
  const rewardPoints = rewardByAccuracy(accuracy);
  const badge = badgeByAccuracy(accuracy);
  const result = await Result.create({
    user: req.user._id,
    quiz: quiz._id,
    lesson: quiz.lesson,
    accuracy,
    score: rewardPoints,
    correctCount: correct,
    totalQuestions: total,
    durationSeconds,
  });
  const user = await User.findById(req.user._id);
  user.rewardPoints += rewardPoints;
  user.lessonsCompleted += 1;
  user.quizAccuracy = Math.round((user.quizAccuracy + accuracy) / 2);
  user.badges = Array.from(new Set([...user.badges, badge]));
  user.level = badge;
  user.learningStreak += 1;
  user.timeSpentMinutes += Math.ceil(durationSeconds / 60);
  await user.save();

  await Reward.create({
    user: user._id,
    rewardPoints,
    badge,
    level: user.level,
  });

  await Leaderboard.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      totalPoints: user.rewardPoints,
      completedLessons: user.lessonsCompleted,
      accuracy: user.quizAccuracy,
    },
    { upsert: true, new: true }
  );

  res.json({
    accuracy,
    rewardPoints,
    badge,
    correct,
    total,
    timeTakenSeconds: durationSeconds,
    resultId: result._id,
  });
};

module.exports = { getQuizForLesson, submitQuiz };
