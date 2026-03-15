const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  getLessons,
  getLessonBySlug,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController');

const router = express.Router();

router.get('/', getLessons);
router.get('/:slug', getLessonBySlug);
router.post('/', protect, adminOnly, createLesson);
router.put('/:id', protect, adminOnly, updateLesson);
router.delete('/:id', protect, adminOnly, deleteLesson);

module.exports = router;
