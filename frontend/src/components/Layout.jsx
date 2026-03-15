import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.25), rgba(2, 0, 20, 0.9)), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(1.1)',
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_45%)]"
        animate={{ opacity: isDark ? 1 : 0.4 }}
      />
      <div className="relative z-20 min-h-screen flex flex-col">
        <Nav toggleTheme={toggleTheme} isDark={isDark} />
        <main className="flex-1 mt-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
