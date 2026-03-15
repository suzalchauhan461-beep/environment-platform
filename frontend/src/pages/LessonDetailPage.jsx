import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

const LessonDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/lessons/${slug}`)
      .then((res) => setLesson(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="py-24 text-center">Loading lesson...</div>;
  }
  if (!lesson) {
    return <div className="py-24 text-center">Lesson not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-3">
        <p className="text-xs text-leaf uppercase tracking-[0.4em]">{lesson.topic}</p>
        <h1 className="text-3xl font-semibold">{lesson.title}</h1>
        <p className="text-white/80">{lesson.content}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {lesson.images?.map((src) => (
            <motion.img
              key={src}
              src={src}
              alt={lesson.title}
              className="rounded-3xl w-full object-cover h-48 border border-white/10"
              whileHover={{ scale: 1.02 }}
            />
          ))}
        </div>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Key Points</h2>
          <ul className="space-y-2">
            {lesson.keyPoints?.map((point) => (
              <li key={point} className="text-white/70">• {point}</li>
            ))}
          </ul>
          <button
            onClick={() => navigate(`/quiz/${lesson.slug}`)}
            className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-leaf to-sky-500 text-sm font-semibold rounded-full"
          >
            Take Lesson Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;
