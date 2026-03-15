import { useEffect, useState } from 'react';
import api from '../services/api';

const LeaderboardPage = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    api.get('/leaderboard').then((res) => setEntries(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-leaf">Leaderboard</p>
        <h1 className="text-3xl font-semibold">Earth guardians in the spotlight</h1>
      </div>
      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="text-white/60 uppercase text-xs border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Learner</th>
              <th className="px-6 py-4">Points</th>
              <th className="px-6 py-4">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry._id} className="border-b border-white/10 hover:bg-white/5">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{entry.user?.name || 'Anonymous'}</td>
                <td className="px-6 py-4">{entry.totalPoints}</td>
                <td className="px-6 py-4">{entry.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
