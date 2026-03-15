import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Footer = () => (
  <footer className="bg-black/70 border-t border-white/20 text-white py-10 mt-16">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Eco Logo" className="h-12 w-12 rounded-full" />
        <div>
          <p className="font-semibold text-lg">Eco Nature Academy</p>
          <p className="text-sm text-white/60">Guiding every learner to protect Earth</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/about" className="hover:text-leaf transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-leaf transition">
          Contact
        </Link>
        <Link to="/lessons" className="hover:text-leaf transition">
          Lessons
        </Link>
        <Link to="/admin" className="hover:text-leaf transition">
          Admin
        </Link>
      </div>
      <div className="text-sm text-white/60">
        <p>© {new Date().getFullYear()} Eco Academy</p>
        <p>Built for passionate nature learners</p>
      </div>
    </div>
  </footer>
);

export default Footer;
