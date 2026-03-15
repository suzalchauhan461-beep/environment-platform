import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const initialTimer = 35 * 60;

const QuizPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(initialTimer);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api
      .get(`/quizzes/${slug}`)
      .then((res) => {
        setLesson(res.data.lesson);
        setQuiz(res.data.quiz);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!quiz || submitted) return undefined;
    if (timer <= 0) {
      handleSubmit();
      return undefined;
    }
    const id = window.setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [quiz, timer, submitted]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (submitted) {
      return;
    }
    setSubmitted(true);
    if (!quiz) return;
    const response = await api.post(`/quizzes/${quiz._id}/submit`, {
      answers,
      durationSeconds: initialTimer - timer,
    });
    navigate('/quiz-result', { state: response.data });
  };

  const progress = useMemo(() => {
    if (!quiz) return 0;
    return Math.round((Object.keys(answers).length / quiz.questions.length) * 100);
  }, [answers, quiz]);

  if (loading) {
    return <div className="py-24 text-center">Preparing quiz...</div>;
  }
  if (!quiz) {
    return <div className="py-24 text-center">Quiz unavailable</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase text-leaf tracking-[0.4em]">Quiz</p>
        <h1 className="text-3xl font-semibold">{quiz.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>Timer: {minutes}:{seconds}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-leaf to-sky-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="space-y-4">
        {quiz.questions.map((question, idx) => (
          <div key={question._id} className="rounded-3xl bg-white/5 border border-white/10 p-5 space-y-3">
            <p className="text-sm text-white/80">Q{idx + 1}. {question.text}</p>
            <div className="grid gap-3">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl border border-white/10 hover:border-leaf cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name={question._id}
                    value={option.value}
                    checked={answers[question._id] === option.value}
                    onChange={() => handleSelect(question._id, option.value)}
                    className="accent-leaf"
                  />
                  <span>{option.value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-leaf via-sky-500 to-sky-400 rounded-full text-sm font-semibold"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
