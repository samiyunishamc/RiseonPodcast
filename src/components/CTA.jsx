import { motion } from "framer-motion";
import { microcopy } from "../data/podcastData";

const CTA = () => {
  return (
    <section id="contact" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="panel p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(145deg, #ffffff 0%, #f4eeff 100%)" }}
        >
          <span className="kicker mb-5">Become a Speaker</span>
          <h2 className="section-title mb-4">Have a story that can help someone speak with confidence?</h2>
          <p className="section-lead mx-auto mb-8">
            Share your experience with our audience and inspire listeners who are still finding their voice.
          </p>

          <a
            href="mailto:riseonpodcast@gmail.com?subject=I Want to Become a Speaker on RiseOnPodcast"
            className="btn-glow"
          >
            Apply to Speak
          </a>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {microcopy.slice(0, 4).map((line, index) => (
              <span className="tag-pill" key={index}>
                {line}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
