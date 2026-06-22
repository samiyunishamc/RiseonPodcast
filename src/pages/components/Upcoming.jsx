import { useState } from "react";
import { motion } from "framer-motion";
import { upcomingPodcasts } from "../data/podcastData";

const Upcoming = () => {
  const [saved, setSaved] = useState([]);
  const featured = upcomingPodcasts.find((item) => item.featured);
  const regulars = upcomingPodcasts.filter((item) => !item.featured);

  const saveSpot = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <section id="upcoming" className="section-space section-alt">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="section-header section-header--center"
        >
          <p className="section-eyebrow">Upcoming Sessions</p>
          <h2 className="section-title">Reserve your seat for the next conversations.</h2>
          <p className="section-lead">
            Live episodes focused on confidence, public speaking, and leadership growth.
          </p>
        </motion.div>

        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="card overflow-hidden mb-6"
          >
            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="relative min-h-[280px] lg:min-h-0">
                <div
                  className="avatar avatar--lg gradient-orange absolute inset-0 rounded-none"
                  aria-hidden="true"
                >
                  {featured.speakerInitials}
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(12,10,29,0.75) 0%, transparent 55%)",
                  }}
                />
                <div className="absolute left-5 right-5 bottom-5">
                  <span className="tag tag--warm mb-2">Featured Guest</span>
                  <p className="text-white text-xl font-bold leading-tight">{featured.speaker}</p>
                  <p className="text-white/60 text-sm mt-1">{featured.designation}</p>
                </div>
              </div>

              <div className="card-padded flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="tag">Featured</span>
                  <span className="tag tag--muted">{featured.date}</span>
                  {featured.time && featured.time !== "To Be Announced" && (
                    <span className="tag tag--muted">{featured.time}</span>
                  )}
                </div>

                <h3 className="text-3xl mb-3 leading-tight">{featured.topic}</h3>

                <p className="text-sm font-semibold mb-1" style={{ color: "var(--ink-soft)" }}>
                  {featured.company}
                </p>
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                  {featured.location}
                </p>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                  {featured.description}
                </p>

                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => saveSpot(featured.id)}
                  >
                    {saved.includes(featured.id) ? "Spot Saved ✓" : "Save My Spot"}
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {regulars.map((ep, index) => (
            <motion.article
              key={ep.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08 }}
              className="card card-padded card--interactive"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar avatar--sm gradient-indigo">{ep.speakerInitials}</div>
                <div>
                  <p className="font-bold text-sm">{ep.speaker}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{ep.designation}</p>
                </div>
              </div>

              <h3 className="text-2xl mb-2">{ep.topic}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {ep.description}
              </p>

              <div className="flex items-center justify-between gap-3 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {ep.date}
                </span>
                <button className="btn btn-secondary btn-sm" onClick={() => saveSpot(ep.id)}>
                  {saved.includes(ep.id) ? "Notified ✓" : "Notify Me"}
                </button>
              </div>
            </motion.article>
          ))}

          {regulars.length === 0 && (
            <article className="card card-padded md:col-span-2 empty-state">
              <div className="empty-state-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-2xl mb-2">More guests coming soon</h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: "var(--muted)" }}>
                Fresh speaker announcements will be published here after confirmation.
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
