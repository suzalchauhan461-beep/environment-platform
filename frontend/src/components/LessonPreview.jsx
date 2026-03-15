import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LessonPreview = ({ lesson }) => (
  <motion.div
    layout
    whileHover={{ y: -4 }}
    className="group bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/30 flex flex-col gap-4"
  >
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-2xl bg-white/10 overflow-hidden">
        <img src={lesson.images?.[0]} alt={lesson.title} className="w-full h-full object-cover" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{lesson.topic}</p>
    </div>
    <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
    <p className="text-sm text-white/70 line-clamp-3">{lesson.content}</p>
    <div className="flex justify-between items-center text-xs text-white/70">
      <span>{lesson.durationMinutes || 18} mins</span>
      <Link
        to={`/lessons/${lesson.slug}`}
        className="text-leaf font-semibold hover:underline underline-offset-4"
      >
        View Lesson
      </Link>
    </div>
  </motion.div>
);

export default LessonPreview;
