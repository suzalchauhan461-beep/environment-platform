const express = require('express');
const { protect } = require('../middleware/auth');
const { getQuizForLesson, submitQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/:slug', protect, getQuizForLesson);
router.post('/:id/submit', protect, submitQuiz);

module.exports = router;
