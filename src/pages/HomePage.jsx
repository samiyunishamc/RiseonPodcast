import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroVisual from "../components/home/HeroVisual";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import Tag from "../components/ui/Tag";
import { stats, upcomingPodcasts } from "../data/podcastData";
import { previewCards } from "../data/siteContent";
import sundaramSpeaker from "../assets/sundaram-speaker.jpg";

const trustBadges = ["Built for Introverts", "Weekly Episodes", "Free on YouTube", "Open Guest Applications"];

const previewIcons = [
  <svg key="a" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
  <svg key="b" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>,
  <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
];

const HomePage = () => {
  const featured = upcomingPodcasts.find((item) => item.featured);

  return (
    <>
      <section className="hero-section">
        <div className="site-container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-eyebrow">India's Podcast for Introverts</span>
            <h1 className="hero-title">
              Rise above fear.
              <br />
              <span className="gradient-text">Speak with confidence.</span>
            </h1>
            <p className="hero-lead">
              Actionable episodes, real founder stories, and practical frameworks
              to help quiet minds become clear, confident voices.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button to="/episodes" size="lg">
                Explore Episodes
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Button>
              <Button href="https://youtube.com/@RiseOnPodcast" variant="secondary" size="lg">Watch on YouTube</Button>
            </div>

            <div className="trust-badges">
              {trustBadges.map((badge) => (
                <span key={badge} className="trust-badge">{badge}</span>
              ))}
            </div>

            <div className="stat-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <AnimatedCounter value={item.value} />
                  <p className="stat-label">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroVisual />
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <FadeIn className="max-w-2xl mx-auto text-center mb-16">
            <span className="section-eyebrow">Introduction</span>
            <h2 className="section-title">Your voice is your power.</h2>
            <p className="section-lead mx-auto">
              RiseOnPodcast helps introverts communicate with impact through real stories,
              practical tools, and a supportive community across India.
            </p>
          </FadeIn>

          {featured && (
            <FadeIn delay={0.08}>
              <Card className="overflow-hidden mb-16 card-accent-top">
                <div className="grid lg:grid-cols-[360px_1fr]">
                  <div className="relative min-h-[280px]">
                    <img src={sundaramSpeaker} alt={featured.speaker} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute left-6 bottom-6">
                      <Tag variant="warm">Featured Session</Tag>
                      <p className="text-white font-bold text-lg mt-2">{featured.speaker}</p>
                    </div>
                  </div>
                  <div className="card-padded flex flex-col justify-center">
                    <Tag>{featured.tag}</Tag>
                    <h3 className="text-2xl sm:text-3xl mt-3 mb-3">{featured.topic}</h3>
                    <p className="text-base mb-4" style={{ color: "var(--muted)" }}>{featured.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button to="/sessions">Reserve Seat</Button>
                      <Button to="/episodes" variant="secondary">All Episodes</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          )}

          <FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {previewCards.map((card, index) => (
                <Card key={card.title} interactive className="card-padded">
                  <div className="card-icon">{previewIcons[index]}</div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--primary)" }}>0{index + 1}</p>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-base mb-6" style={{ color: "var(--muted)" }}>{card.description}</p>
                  <Link to={card.href} className="link-primary">{card.label} →</Link>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space section-dark">
        <div className="site-container text-center">
          <FadeIn>
            <span className="section-eyebrow">Get Started</span>
            <h2 className="section-title">Ready to share your story?</h2>
            <p className="section-lead mx-auto mb-8 max-w-lg">
              Apply to be a guest and inspire introverts across India with your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/guest" size="lg">Become a Guest</Button>
              <Button to="/contact" variant="secondary" size="lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>Contact Us</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default HomePage;
