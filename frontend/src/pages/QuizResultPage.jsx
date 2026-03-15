import { useLocation, useNavigate } from 'react-router-dom';

const QuizResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  if (!result) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="text-lg">No result data available.</p>
        <button
          onClick={() => navigate('/lessons')}
          className="px-4 py-2 bg-white/10 border border-white/40 rounded-full"
        >
          Back to lessons
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-center">
      <p className="text-xs uppercase text-leaf tracking-[0.4em]">Quiz result</p>
      <h1 className="text-3xl font-semibold">Well done!</h1>
      <p className="text-white/80">
        You answered {result.correct} out of {result.total} questions. Accuracy {result.accuracy}%.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-xs uppercase text-white/50">Points</p>
          <p className="text-3xl font-semibold">{result.rewardPoints}</p>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-xs uppercase text-white/50">Badge</p>
          <p className="text-2xl font-semibold">{result.badge}</p>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-xs uppercase text-white/50">Time</p>
          <p className="text-2xl font-semibold">{Math.ceil(result.timeTakenSeconds / 60)} mins</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/leaderboard')}
        className="px-6 py-3 bg-gradient-to-r from-leaf to-sky-500 rounded-full text-sm font-semibold"
      >
        Check Leaderboard
      </button>
    </div>
  );
};

export default QuizResultPage;
