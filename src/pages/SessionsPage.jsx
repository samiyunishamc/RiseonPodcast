import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import Tag from "../components/ui/Tag";
import { upcomingPodcasts } from "../data/podcastData";
import { sessionSchedule } from "../data/siteContent";
import sundaramSpeaker from "../assets/sundaram-speaker.jpg";

const Countdown = () => {
  const [time, setTime] = useState({ days: "--", hours: "--", mins: "--" });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 14);
    target.setHours(10, 0, 0, 0);

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTime({ days: "00", hours: "00", mins: "00" });
        return;
      }
      setTime({
        days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        mins: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
      });
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to next session">
      {[
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Mins", value: time.mins },
      ].map((item) => (
        <div key={item.label} className="countdown-unit">
          <span className="countdown-value">{item.value}</span>
          <span className="countdown-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const SessionsPage = () => {
  const [saved, setSaved] = useState([]);
  const featured = upcomingPodcasts.find((item) => item.featured);
  const regulars = upcomingPodcasts.filter((item) => !item.featured);

  const reserve = (id) => setSaved((prev) => (prev.includes(id) ? prev : [...prev, id]));

  return (
    <>
      <section className="page-hero section-space--tight">
        <div className="site-container">
          <FadeIn>
            <p className="section-eyebrow">Upcoming Sessions</p>
            <h1 className="page-title">Reserve your seat for the next conversations.</h1>
            <p className="page-lead">
              Live episodes focused on confidence, public speaking, and leadership growth.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="site-container">
          <FadeIn className="mb-10">
            <Card className="card-padded flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-bold mb-1">Next session starts in</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>Estimated countdown — date TBA</p>
              </div>
              <Countdown />
            </Card>
          </FadeIn>

          {featured && (
            <FadeIn>
              <Card className="overflow-hidden mb-8">
                <div className="grid lg:grid-cols-[320px_1fr]">
                  <div className="relative min-h-[280px]">
                    <img src={sundaramSpeaker} alt={featured.speaker} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    <div className="absolute left-5 bottom-5">
                      <Tag variant="warm">Featured Guest</Tag>
                      <p className="text-white text-xl font-bold mt-2">{featured.speaker}</p>
                    </div>
                  </div>
                  <div className="card-padded">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Tag>Featured</Tag>
                      <Tag variant="muted">{featured.date}</Tag>
                    </div>
                    <h2 className="text-3xl mb-3">{featured.topic}</h2>
                    <p className="text-sm font-semibold">{featured.designation}</p>
                    <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>{featured.company}</p>
                    <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{featured.location}</p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>{featured.description}</p>
                    <Button onClick={() => reserve(featured.id)}>
                      {saved.includes(featured.id) ? "Seat Reserved ✓" : "Reserve Seat"}
                    </Button>
                  </div>
                </div>
              </Card>
            </FadeIn>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {regulars.map((ep, i) => (
              <FadeIn key={ep.id} delay={i * 0.06}>
                <Card interactive className="card-padded">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar avatar--sm gradient-indigo">{ep.speakerInitials}</div>
                    <div>
                      <p className="font-bold text-sm">{ep.speaker}</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>{ep.designation}</p>
                    </div>
                  </div>
                  <h3 className="text-2xl mb-2">{ep.topic}</h3>
                  <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{ep.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>{ep.date}</span>
                    <Button size="sm" variant="secondary" onClick={() => reserve(ep.id)}>
                      {saved.includes(ep.id) ? "Reserved ✓" : "Notify Me"}
                    </Button>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h2 className="text-2xl mb-6">Session Schedule</h2>
            <div className="overflow-x-auto">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Format</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionSchedule.map((row) => (
                    <tr key={row.day + row.format}>
                      <td>{row.day}</td>
                      <td>{row.time}</td>
                      <td>{row.format}</td>
                      <td><Tag variant="muted">{row.status}</Tag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default SessionsPage;
