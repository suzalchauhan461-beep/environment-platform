import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useLessons from '../hooks/useLessons';
import LessonPreview from '../components/LessonPreview';

const heroBadges = [
  'Reward points & streaks',
  'Live leaderboard',
  'Micro-lessons + quizzes',
];

const levels = [
  'Beginner Explorer',
  'Eco Learner',
  'Eco Warrior',
  'Nature Protector',
  'Earth Guardian',
];

const HomePage = () => {
  const { lessons, loading } = useLessons();
  const featuredLessons = useMemo(() => lessons.slice(0, 4), [lessons]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase text-leaf tracking-[0.4em]">Nature first</p>
          <h1 className="text-4xl md:text-5xl font-display leading-tight">
            Every lesson is a journey through Earth's most vital systems.
          </h1>
          <p className="text-white/80">
            Eco Nature Academy blends cinematic imagery, gamified quizzes, curated lessons, and real-time
            progress charts so learners stay inspired while protecting the planet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/lessons"
              className="px-6 py-3 bg-gradient-to-r from-leaf to-sky-500 rounded-full text-sm font-semibold"
            >
              Start Learning
            </Link>
            <Link to="/about" className="px-6 py-3 border border-white/30 rounded-full text-sm">
              Learn about us
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {heroBadges.map((badge) => (
              <motion.span
                key={badge}
                className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70"
                whileHover={{ scale: 1.05 }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/20 p-6 bg-white/5"
        >
          <p className="text-sm text-white/80 mb-3">Levels unlocked today</p>
          <div className="space-y-3">
            {levels.map((level, idx) => (
              <div key={level} className="flex justify-between text-sm">
                <span>{level}</span>
                <span className="text-leaf text-xs">{(idx + 1) * 5} pts</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Featured Lessons</h2>
        {loading ? (
          <p>Loading lessons...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {featuredLessons.map((lesson) => (
              <LessonPreview key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
