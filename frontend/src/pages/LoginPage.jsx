import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import logo from '/logo.png';

const LoginPage = () => {
  const { updateUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', form);
      updateUser(response.data.user);
      setToken(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-5">
        <div className="flex justify-center">
          <img src={logo} alt="Eco logo" className="h-12 w-12 rounded-full" />
        </div>
        <h1 className="text-2xl font-semibold">Login</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-leaf to-sky-500 rounded-full text-sm font-semibold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
