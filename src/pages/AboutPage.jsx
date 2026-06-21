import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import SectionHeader from "../components/ui/SectionHeader";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import { slogans } from "../data/podcastData";
import { mission, vision, whyUs, benefits, community } from "../data/siteContent";

const icons = [
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3Z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3Z"/></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
];

const AboutPage = () => (
  <>
    <section className="page-hero">
      <div className="site-container">
        <FadeIn>
          <span className="section-eyebrow">About</span>
          <h1 className="page-title">Built for introverts who dare to speak.</h1>
          <p className="page-lead">
            RiseOnPodcast is a space where quiet minds learn to lead with clarity, courage, and an authentic voice.
          </p>
        </FadeIn>
      </div>
    </section>

    <section className="section-space section-alt">
      <div className="site-container grid lg:grid-cols-2 gap-8">
        <FadeIn>
          <Card className="card-padded h-full card-accent-top">
            <span className="section-eyebrow">Mission</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{mission.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>{mission.body}</p>
          </Card>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Card className="card-padded h-full">
            <span className="section-eyebrow">Vision</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{vision.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>{vision.body}</p>
          </Card>
        </FadeIn>
      </div>
    </section>

    <section className="section-space">
      <div className="site-container">
        <SectionHeader center eyebrow="Why RiseOnPodcast" title="More than a podcast — a confidence movement." lead="We combine storytelling, mentorship, and practical frameworks designed specifically for introverts." />
        <div className="grid md:grid-cols-3 gap-6">
          {whyUs.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <Card interactive className="card-padded h-full">
                <div className="card-icon">{icons[i]}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>{item.text}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="section-space section-alt">
      <div className="site-container">
        <SectionHeader center eyebrow="Benefits" title="What you'll gain as a listener." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <div className="stat-card h-full">
                <p className="stat-value text-xl">{String(i + 1).padStart(2, "0")}</p>
                <p className="font-bold text-base mt-3 mb-1">{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="site-container">
        <FadeIn>
          <Card className="card-padded text-center card--glass">
            <SectionHeader center eyebrow="Community" title={community.title} lead={community.body} />
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {slogans.map((line) => <Tag key={line} variant="muted">{line}</Tag>)}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {community.links.map((link) => <Button key={link.label} href={link.href} variant="secondary">{link.label}</Button>)}
              <Button to="/guest">Apply as Guest</Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  </>
);

export default AboutPage;
