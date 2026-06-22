import { motion } from "framer-motion";
import { stats } from "../data/podcastData";

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="hero-section section-space">
      <div className="hero-inner site-container">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              India's podcast for introverts
            </div>

            <h1 className="hero-title">
              Rise above fear.
              <br />
              <em>Speak with confidence.</em>
            </h1>

            <p className="hero-lead">
              Actionable episodes, real founder stories, and practical frameworks
              to help quiet minds become clear, confident voices.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <button onClick={() => scrollTo("podcasts")} className="btn btn-primary">
                Explore Episodes
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href="https://youtube.com/@RiseOnPodcast"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ background: "rgba(255,255,255,0.08)", borderColor: "var(--hero-border)", color: "#fff" }}
              >
                Watch on YouTube
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((item) => (
                <div className="hero-stat" key={item.label}>
                  <p className="hero-stat-value">{item.value}</p>
                  <p className="hero-stat-label">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="hero-panel"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-bold text-white/90">Now Playing</p>
                <p className="text-xs text-white/45 mt-0.5">Latest from RiseOnPodcast</p>
              </div>
              <div className="waveform" aria-hidden="true">
                {[...Array(7)].map((_, i) => (
                  <span key={i} style={{ height: `${40 + (i % 3) * 20}%` }} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Next Focus", value: "Stage confidence drills" },
                { label: "Mentor Session", value: "Founder Q&A · Sunday" },
                { label: "Format", value: "Stories, frameworks, practice" },
                { label: "Audience", value: "Introverts & young leaders" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 p-3.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--hero-border)" }}
                >
                  <span className="text-xs font-semibold text-white/45 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-semibold text-white/90 text-right">{item.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo("upcoming")}
              className="btn btn-primary w-full mt-6"
              style={{ background: "rgba(255,255,255,0.12)", boxShadow: "none", border: "1px solid var(--hero-border)" }}
            >
              View Upcoming Sessions
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
