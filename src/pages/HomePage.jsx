import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import Tag from "../components/ui/Tag";
import { stats, upcomingPodcasts } from "../data/podcastData";
import { previewCards } from "../data/siteContent";
import sundaramSpeaker from "../assets/sundaram-speaker.jpg";

const HomePage = () => {
  const featured = upcomingPodcasts.find((item) => item.featured);

  return (
    <>
      <section className="hero-section section-space">
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
                <Button to="/episodes">Explore Episodes</Button>
                <Button
                  href="https://youtube.com/@RiseOnPodcast"
                  variant="secondary"
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "var(--hero-border)", color: "#fff" }}
                >
                  Watch on YouTube
                </Button>
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
              transition={{ duration: 0.75, delay: 0.12 }}
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
              {[
                { label: "Next Focus", value: "Stage confidence drills" },
                { label: "Mentor Session", value: "Founder Q&A · Sunday" },
                { label: "Format", value: "Stories, frameworks, practice" },
              ].map((item) => (
                <div key={item.label} className="hero-panel-row">
                  <span className="hero-panel-label">{item.label}</span>
                  <span className="hero-panel-value">{item.value}</span>
                </div>
              ))}
              <Button
                to="/sessions"
                className="w-full mt-6"
                style={{ background: "rgba(255,255,255,0.12)", boxShadow: "none", border: "1px solid var(--hero-border)" }}
              >
                View Upcoming Sessions
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <FadeIn className="max-w-2xl mx-auto text-center mb-16">
            <p className="section-eyebrow justify-center">Introduction</p>
            <h2 className="section-title">Your voice is your power.</h2>
            <p className="section-lead mx-auto">
              RiseOnPodcast is India's motivational podcast for introverts — helping quiet minds
              build stage confidence through real stories, practical tools, and a supportive community.
            </p>
          </FadeIn>

          {featured && (
            <FadeIn delay={0.08}>
              <Card className="overflow-hidden mb-16">
                <div className="grid lg:grid-cols-[340px_1fr]">
                  <div className="relative min-h-[260px]">
                    <img src={sundaramSpeaker} alt={featured.speaker} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-5 bottom-5">
                      <Tag variant="warm">Featured Session</Tag>
                    </div>
                  </div>
                  <div className="card-padded">
                    <Tag>{featured.tag}</Tag>
                    <h3 className="text-3xl mt-3 mb-2">{featured.topic}</h3>
                    <p className="font-semibold text-sm mb-1">{featured.speaker}</p>
                    <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{featured.description}</p>
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
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent-dark)" }}>
                    0{index + 1}
                  </p>
                  <h3 className="text-2xl mb-2">{card.title}</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>{card.description}</p>
                  <Link to={card.href} className="footer-link font-semibold">{card.label} →</Link>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="site-container text-center">
          <FadeIn>
            <h2 className="section-title mb-4">Ready to share your story?</h2>
            <p className="section-lead mx-auto mb-8 max-w-lg">
              Apply to be a guest and inspire introverts across India with your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/guest">Become a Guest</Button>
              <Button to="/contact" variant="secondary">Contact Us</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default HomePage;
