import { motion } from "framer-motion";
import { stats } from "../data/podcastData";

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="section-space pt-32 sm:pt-36 soft-grid">
      <div className="site-container">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="kicker mb-6">
              <span className="kicker-dot" />
              India's motivational podcast for introverts
            </div>

            <h1 className="section-title mb-5">
              Rise above fear.
              <br />
              Speak with confidence.
            </h1>

            <p className="section-lead mb-8">
              We help quiet minds become clear voices through actionable episodes,
              real founder stories, and practical frameworks for stage confidence.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button onClick={() => scrollTo("podcasts")} className="btn-primary">
                Explore Podcasts
              </button>
              <a
                href="https://youtube.com/@RiseOnPodcast"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Watch on YouTube
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((item) => (
                <article className="metric" key={item.label}>
                  <p className="metric-value">{item.value}</p>
                  <p className="metric-label">{item.label}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="panel p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold text-[#1a1a1a]">Community Snapshot</p>
              <span className="tag-pill">Weekly Growth</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="metric">
                <p className="text-xs text-[#6b7280]">Next Focus</p>
                <p className="font-semibold text-sm">Stage confidence drills</p>
              </div>
              <div className="metric">
                <p className="text-xs text-[#6b7280]">Mentor Session</p>
                <p className="font-semibold text-sm">Founder Q&A (Sunday)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="metric">
                <p className="text-xs text-[#6b7280]">Format</p>
                <p className="font-semibold text-sm">Stories, frameworks, practice</p>
              </div>
              <div className="metric">
                <p className="text-xs text-[#6b7280]">Audience</p>
                <p className="font-semibold text-sm">Introverts & young leaders</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
