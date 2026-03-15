const Lesson = require('../models/Lesson');

const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();

const getLessons = async (req, res) => {
  const { topic, search } = req.query;
  const filter = {};
  if (topic) filter.topic = topic;
  if (search) filter.title = new RegExp(search, 'i');
  const lessons = await Lesson.find(filter).sort({ createdAt: 1 });
  res.json(lessons);
};

const getLessonBySlug = async (req, res) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug });
  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }
  res.json(lesson);
};

const createLesson = async (req, res) => {
  const { title, topic, content, images, keyPoints, tags, durationMinutes } = req.body;
  const lesson = await Lesson.create({
    title,
    topic,
    content,
    images,
    keyPoints,
    tags,
    durationMinutes,
    slug: slugify(title),
  });
  res.status(201).json(lesson);
};

const updateLesson = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }
  Object.assign(lesson, req.body, { slug: slugify(req.body.title || lesson.title) });
  await lesson.save();
  res.json(lesson);
};

const deleteLesson = async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lesson removed' });
};

module.exports = {
  getLessons,
  getLessonBySlug,
  createLesson,
  updateLesson,
  deleteLesson,
};
