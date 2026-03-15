import { useMemo, useState } from 'react';
import LessonPreview from '../components/LessonPreview';
import useLessons from '../hooks/useLessons';
import { motion } from 'framer-motion';

const LessonsPage = () => {
  const { lessons, loading } = useLessons();
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => lessons.filter((lesson) => lesson.title.toLowerCase().includes(search.toLowerCase())),
    [lessons, search]
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-8">
      <div className="space-y-3">
        <p className="text-xs uppercase text-leaf tracking-[0.4em]">Lessons</p>
        <h1 className="text-3xl md:text-4xl font-semibold">
          Follow the rhythm of ecosystems one lesson at a time.
        </h1>
        <div className="flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 w-full md:w-64"
          />
          <span className="text-sm text-white/70">{filtered.length} lessons matching</span>
        </div>
      </div>
      {loading ? (
        <div className="py-24 text-center">Loading lessons...</div>
      ) : (
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          {filtered.map((lesson) => (
            <LessonPreview key={lesson._id} lesson={lesson} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LessonsPage;
