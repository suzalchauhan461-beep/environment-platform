import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const AdminPage = () => {
  const { token } = useContext(AuthContext);
  const [metrics, setMetrics] = useState({});
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: '', topic: '', content: '', image: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    api.get('/admin/metrics').then((res) => setMetrics(res.data));
    api.get('/admin/users').then((res) => setUsers(res.data));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/lessons', {
        title: form.title,
        topic: form.topic,
        content: form.content,
        images: form.image ? [form.image] : [],
        keyPoints: ['Custom lesson created via admin tool'],
      });
      setMessage('Lesson created!');
      setForm({ title: '', topic: '', content: '', image: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create lesson');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-leaf">Admin</p>
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-xs uppercase text-white/60">Lessons</p>
          <p className="text-3xl font-semibold">{metrics.lessonCount || '—'}</p>
        </div>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-xs uppercase text-white/60">Quizzes</p>
          <p className="text-3xl font-semibold">{metrics.quizCount || '—'}</p>
        </div>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-xs uppercase text-white/60">Users</p>
          <p className="text-3xl font-semibold">{metrics.userCount || '—'}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Create a lesson</h2>
          <input
            type="text"
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20"
          />
          <input
            type="text"
            required
            placeholder="Topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20"
          />
          <input
            type="text"
            placeholder="Cover image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20"
          />
          <textarea
            required
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 min-h-[120px]"
          />
          <button type="submit" className="px-6 py-3 bg-gradient-to-r from-leaf to-sky-500 rounded-full">
            Publish lesson
          </button>
          {message && <p className="text-sm text-white/70">{message}</p>}
        </form>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Recent users</h2>
          <div className="space-y-3 max-h-72 overflow-auto">
            {users.map((userEntry) => (
              <div key={userEntry._id} className="flex justify-between text-sm text-white/70">
                <span>{userEntry.name}</span>
                <span>{userEntry.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
