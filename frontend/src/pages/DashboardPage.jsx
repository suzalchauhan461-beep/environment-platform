import { useContext, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const progressData = useMemo(
    () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Minutes Spent',
          data: [45, 60, 78, 92, 110, 105, 130],
          borderColor: '#7dd3fc',
          backgroundColor: 'rgba(125, 211, 252, 0.2)',
          tension: 0.3,
        },
      ],
    }),
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase text-leaf tracking-[0.4em]">Dashboard</p>
        <h1 className="text-3xl font-semibold">Your learning heartbeat</h1>
      </div>
      <motion.div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-2">
          <h3 className="text-sm uppercase text-white/40">Lessons completed</h3>
          <p className="text-3xl font-semibold">{user?.lessonsCompleted || 0}</p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-leaf to-sky-500" style={{ width: `${Math.min((user?.lessonsCompleted || 0) * 4, 100)}%` }} />
          </div>
        </div>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-2">
          <h3 className="text-sm uppercase text-white/40">Quiz accuracy</h3>
          <p className="text-3xl font-semibold">{user?.quizAccuracy || 0}%</p>
        </div>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-2">
          <h3 className="text-sm uppercase text-white/40">Reward points</h3>
          <p className="text-3xl font-semibold">{user?.rewardPoints || 0}</p>
          <p className="text-xs text-white/60">Level: {user?.level || 'Beginner Explorer'}</p>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl bg-white/5 border border-white/10 p-6">
        <Line data={progressData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </motion.div>
    </div>
  );
};

export default DashboardPage;
