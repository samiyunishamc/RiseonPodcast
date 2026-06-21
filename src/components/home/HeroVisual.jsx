import { motion } from "framer-motion";

const HeroVisual = () => (
  <div className="hero-visual" aria-hidden="true">
    <motion.div
      className="hero-orb hero-orb--1"
      animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="hero-orb hero-orb--2"
      animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="hero-orb hero-orb--3"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      className="hero-podcast-card"
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-podcast-card__glow" />
      <div className="hero-podcast-card__inner">
        <div className="hero-podcast-card__header">
          <span className="hero-podcast-card__dot" />
          <span className="hero-podcast-card__live">Live Session</span>
        </div>
        <div className="hero-podcast-card__mic">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="11" rx="3" fill="url(#micGrad)" />
            <path d="M5 10a7 7 0 0 0 14 0M12 17v3" stroke="url(#micGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="micGrad" x1="0" y1="0" x2="24" y2="24">
                <stop stopColor="#5B5FF8" />
                <stop offset="1" stopColor="#7C4DFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="waveform waveform--hero">
          {[...Array(12)].map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.08}s`, height: `${30 + (i % 4) * 18}%` }} />
          ))}
        </div>
        <p className="hero-podcast-card__title">Confidence Unlocked</p>
        <p className="hero-podcast-card__sub">Episode · RiseOnPodcast</p>
      </div>
    </motion.div>

    <motion.div
      className="hero-float-badge hero-float-badge--1"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span>🎙️</span> Real Stories
    </motion.div>
    <motion.div
      className="hero-float-badge hero-float-badge--2"
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <span>✦</span> Weekly Episodes
    </motion.div>
  </div>
);

export default HeroVisual;
