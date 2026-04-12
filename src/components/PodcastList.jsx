import { motion } from "framer-motion";
import { pastPodcasts } from "../data/podcastData";

const PodcastList = () => {
  return (
    <section id="podcasts" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <span className="kicker mb-5">Podcast Library</span>
          <h2 className="section-title mb-4">Start with episodes that build speaking confidence.</h2>
          <p className="section-lead mx-auto">
            Browse practical sessions and watch the full stories on our YouTube channel.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastPodcasts.map((ep, index) => (
            <motion.article
              key={ep.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.06 }}
              className="panel overflow-hidden"
            >
              <div className="h-44 px-6 py-5 flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #efe7ff 0%, #f8f4ff 100%)" }}>
                <span className="tag-pill self-start">{ep.tag}</span>
                <p className="text-sm font-semibold text-[#1f1f1f]">Episode {index + 1}</p>
              </div>

              <div className="p-5">
                <h3 className="text-2xl mb-2">{ep.title}</h3>
                <p className="text-sm text-[#6b7280] mb-3">{ep.speaker}</p>
                <p className="text-sm text-[#4b5563] leading-relaxed mb-4">{ep.description}</p>

                <a className="btn-outline w-full" href={ep.youtubeUrl} target="_blank" rel="noreferrer">
                  Watch Episode
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastList;
