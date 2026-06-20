import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import { contactInfo } from "../data/siteContent";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <section className="page-hero section-space--tight">
        <div className="site-container">
          <FadeIn>
            <p className="section-eyebrow">Contact</p>
            <h1 className="page-title">Get in touch</h1>
            <p className="page-lead">
              Questions, partnerships, or feedback — we'd love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <FadeIn>
            <div className="space-y-6">
              <Card className="card-padded">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>Email</p>
                <a href={`mailto:${contactInfo.email}`} className="footer-link font-semibold text-lg">
                  {contactInfo.email}
                </a>
              </Card>
              <Card className="card-padded">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>Location</p>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{contactInfo.location}</p>
              </Card>
              <Card className="card-padded">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>Social</p>
                <div className="flex flex-col gap-3">
                  {contactInfo.social.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="footer-link font-semibold">
                      {link.label} →
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="card-padded">
              {sent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <div className="empty-state-icon mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="text-2xl mb-2">Message ready to send</h2>
                  <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                    Your email client should open with your message. We'll get back to you soon.
                  </p>
                  <Button variant="secondary" onClick={() => setSent(false)}>Send another</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="form-label" htmlFor="contact-name">Name</label>
                    <input id="contact-name" className="form-input" type="text" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <input id="contact-email" className="form-input" type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" className="form-input resize-y min-h-[8rem]" required value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
                  </div>
                  <Button type="submit" variant="dark">Send Message</Button>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
