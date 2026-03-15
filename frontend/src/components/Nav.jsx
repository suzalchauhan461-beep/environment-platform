import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

const navSections = [
  { label: 'Home', to: '/' },
  { label: 'Lessons', to: '/lessons' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Admin', to: '/admin' },
  { label: 'Contact', to: '/contact' },
];

const Nav = ({ toggleTheme, isDark }) => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between backdrop-blur bg-black/40 border-b border-white/20 fixed top-0 left-0 z-30">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="EcoLogo" className="h-10 w-10 object-cover rounded-full" />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-100">Eco</p>
          <p className="text-lg font-semibold text-white">Nature Academy</p>
        </div>
      </Link>
      <div className="hidden lg:flex gap-4 text-sm font-medium">
        {navSections.map((link) => (
          <motion.div key={link.to} whileHover={{ scale: 1.05 }}>
            <Link to={link.to} className="text-white/80 hover:text-white transition">
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="bg-white/10 border border-white/40 px-3 py-1 rounded-full text-xs uppercase tracking-wide text-white"
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
        <Link
          to="/login"
          className="px-4 py-2 bg-gradient-to-r from-leaf to-sky-500 rounded-full text-sm font-semibold text-white"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
