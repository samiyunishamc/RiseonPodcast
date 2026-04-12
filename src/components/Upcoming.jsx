import { useState } from "react";
import { motion } from "framer-motion";
import { upcomingPodcasts } from "../data/podcastData";
import sundaramSpeaker from "../assets/sundaram ramaswamy speaker.jpg";

const Upcoming = () => {
  const [saved, setSaved] = useState([]);
  const featured = upcomingPodcasts.find((item) => item.featured);
  const regulars = upcomingPodcasts.filter((item) => !item.featured);

  const saveSpot = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <section id="upcoming" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <span className="kicker mb-5">Upcoming Sessions</span>
          <h2 className="section-title mb-4">Reserve your seat for the next conversations.</h2>
          <p className="section-lead mx-auto">
            Join live episodes focused on confidence, public speaking, and leadership growth.
          </p>
        </motion.div>

        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="panel p-4 sm:p-5 mb-5"
            style={{
              background:
                "linear-gradient(130deg, rgba(255,255,255,1) 0%, rgba(248,243,255,1) 100%)",
            }}
          >
            <div className="grid md:grid-cols-[260px_1fr] gap-5 items-stretch">
              <div className="relative rounded-3xl overflow-hidden min-h-[280px]">
                <img
                  src={sundaramSpeaker}
                  alt="Sundaram Ramaswamy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14, 14, 20, 0.62), rgba(14, 14, 20, 0.05))",
                  }}
                />
                <div className="absolute left-4 right-4 bottom-4">
                  <p className="text-white text-[0.72rem] tracking-[0.16em] uppercase font-bold mb-1">
                    Featured Guest
                  </p>
                  <p className="text-white text-lg font-extrabold leading-tight">
                    {featured.speaker}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-white/80 border border-[#e6dcfc] p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="tag-pill">Featured</span>
                  <span className="tag-pill">{featured.date}</span>
                </div>
                <h3 className="text-[1.9rem] leading-tight mb-3">{featured.topic}</h3>
                <p className="font-semibold text-[#1e1e1e]">{featured.designation}</p>
                <p className="text-sm text-[#6b7280] mb-4">
                  {featured.company ? `${featured.company} · ` : ""}
                  {featured.location}
                </p>
                <p className="text-sm text-[#4b5563] leading-relaxed mb-5">
                  {featured.description}
                </p>
                <button className="btn-primary" onClick={() => saveSpot(featured.id)}>
                  {saved.includes(featured.id) ? "Spot Saved" : "Save My Spot"}
                </button>
              </div>
            </div>
          </motion.article>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {regulars.map((ep, index) => (
            <motion.article
              key={ep.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08 }}
              className="panel p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl grid place-items-center text-white font-bold"
                  style={{ background: "linear-gradient(135deg,#8b5cf6,#6d3ce6)" }}>
                  {ep.speakerInitials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{ep.speaker}</p>
                  <p className="text-xs text-[#6b7280]">{ep.designation}</p>
                </div>
              </div>

              <h3 className="text-2xl mb-2">{ep.topic}</h3>
              <p className="text-sm text-[#4b5563] mb-3">{ep.description}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#6b7280] font-semibold">{ep.date}</span>
                <button className="btn-notify" onClick={() => saveSpot(ep.id)}>
                  {saved.includes(ep.id) ? "Notified" : "Notify Me"}
                </button>
              </div>
            </motion.article>
          ))}

          {regulars.length === 0 && (
            <article className="panel p-6 md:col-span-2 text-center">
              <h3 className="text-2xl mb-2">More guests coming soon</h3>
              <p className="text-sm text-[#4b5563]">
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
