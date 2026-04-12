import { motion } from "framer-motion";
import { slogans } from "../data/podcastData";

const values = [
  {
    title: "Real stories",
    text: "Conversations with people who transformed fear into stage clarity.",
  },
  {
    title: "Practical tools",
    text: "Frameworks you can apply this week for voice, delivery, and mindset.",
  },
  {
    title: "Safe community",
    text: "A respectful space where introverts learn confidence without pressure.",
  },
];

const About = () => {
  return (
    <section id="about" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <span className="kicker mb-5">Our Mission</span>
          <h2 className="section-title mb-5">Every confident speaker starts as a quiet learner.</h2>
          <p className="section-lead mx-auto mb-12">
            RiseOnPodcast is built to help introverts communicate with impact. We blend storytelling,
            training insights, and speaker mentorship so your voice feels natural, not forced.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {values.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="panel p-6"
            >
              <h3 className="text-2xl mb-2">{item.title}</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">{item.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="panel p-7 sm:p-8 text-center">
          <p className="text-2xl sm:text-3xl mb-4">"Your story matters. Your voice can lead."</p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {slogans.map((line, index) => (
              <span className="tag-pill" key={index}>
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
