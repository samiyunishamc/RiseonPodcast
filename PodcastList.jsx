import { motion } from "framer-motion";
import { pastPodcasts } from "../data/podcastData";

const PodcastList = () => {
  return (
    <section id="podcasts" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="section-header section-header--center"
        >
          <p className="section-eyebrow">Episode Library</p>
          <h2 className="section-title">Start with episodes that build speaking confidence.</h2>
          <p className="section-lead">
            Browse practical sessions and watch the full stories on our YouTube channel.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pastPodcasts.map((ep, index) => (
            <motion.article
              key={ep.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.06 }}
              className="card card--interactive overflow-hidden flex flex-col"
            >
              <div
                className="h-44 px-5 py-4 flex flex-col justify-between"
                style={{ background: "linear-gradient(135deg, var(--accent-soft) 0%, var(--bg-alt) 100%)" }}
              >
                <span className="tag">{ep.tag}</span>
                <p className="text-sm font-bold" style={{ color: "var(--ink-soft)" }}>
                  Episode {index + 1}
                </p>
              </div>

              <div className="card-padded flex flex-col flex-1">
                <h3 className="text-2xl mb-2">{ep.title}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--muted)" }}>
                  {ep.speaker}
                </p>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--muted)" }}>
                  {ep.description}
                </p>

                <a
                  className="btn btn-secondary w-full"
                  href={ep.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Episode
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}

          {pastPodcasts.length === 0 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="card sm:col-span-2 lg:col-span-3 empty-state"
            >
              <div className="empty-state-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-2xl mb-2">Episodes are being curated</h3>
              <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--muted)" }}>
                New podcast episodes will appear here as soon as they are published.
              </p>
              <a
                href="https://youtube.com/@RiseOnPodcast"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Subscribe on YouTube
              </a>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
};

export default PodcastList;
