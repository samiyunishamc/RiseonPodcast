import { motion } from "framer-motion";
import { slogans } from "../data/podcastData";

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" strokeLinecap="round" />
      </svg>
    ),
    title: "Real stories",
    text: "Conversations with people who transformed fear into stage clarity and authentic leadership.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3Z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3Z" strokeLinecap="round" />
      </svg>
    ),
    title: "Practical tools",
    text: "Frameworks you can apply this week for voice, delivery, and a stronger speaking mindset.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    ),
    title: "Safe community",
    text: "A respectful space where introverts build confidence without pressure or performance anxiety.",
  },
];

const About = () => {
  return (
    <section id="about" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="section-header section-header--center"
        >
          <p className="section-eyebrow">Our Mission</p>
          <h2 className="section-title">Every confident speaker starts as a quiet learner.</h2>
          <p className="section-lead">
            RiseOnPodcast helps introverts communicate with impact. We blend storytelling,
            training insights, and speaker mentorship so your voice feels natural — not forced.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {values.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="card card-padded card--interactive"
            >
              <div
                className="w-11 h-11 rounded-xl grid place-items-center mb-5"
                style={{ background: "var(--accent-soft)", color: "var(--accent-dark)" }}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card card-padded text-center"
          style={{ background: "linear-gradient(135deg, var(--accent-soft) 0%, var(--surface) 60%)" }}
        >
          <blockquote className="text-2xl sm:text-3xl mb-6 mx-auto max-w-2xl">
            "Your story matters. Your voice can lead."
          </blockquote>
          <div className="flex flex-wrap gap-2 justify-center">
            {slogans.map((line, index) => (
              <span className="tag tag--muted" key={index}>
                {line}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
