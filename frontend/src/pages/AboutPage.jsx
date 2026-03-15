import { motion } from 'framer-motion';

const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="text-sm uppercase tracking-[0.4em] text-leaf">About</p>
      <h1 className="text-3xl md:text-4xl font-display">Nature education designed with passion.</h1>
      <p className="text-white/80 mt-4">
        Eco Nature Academy was born from a love for Earth’s vast biomes. Each lesson is rooted in science,
        enriched with HD imagery of mountains, rivers, forests, and wildlife, and paired with quizzes that
        reward curiosity. We celebrate learners at every level with badges, streaks, and community recognition.
      </p>
    </motion.div>
    <div className="grid md:grid-cols-2 gap-10">
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-3"
      >
        <h3 className="text-xl font-semibold">Our Curriculum</h3>
        <p className="text-white/70">70 lessons across environment, ecology, pollution, climate, and sustainable tech.</p>
        <p className="text-white/70">Biogeochemical cycles, biodiversity, waste, agro innovations, and more.</p>
      </motion.div>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-3"
      >
        <h3 className="text-xl font-semibold">Why it works</h3>
        <p className="text-white/70">
          Framer Motion brings subtle parallax journeys. Tailwind keeps the layout responsive. Chart.js visualizes
          progress. The backend tracks quizzes, badges, and leaderboard standings.
        </p>
      </motion.div>
    </div>
  </div>
);

export default AboutPage;
