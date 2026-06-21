import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import FloatingInput from "../components/ui/FloatingInput";
import { contactInfo } from "../data/siteContent";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <FadeIn>
            <span className="section-eyebrow">Contact</span>
            <h1 className="page-title">Get in touch</h1>
            <p className="page-lead">Questions, partnerships, or feedback — we'd love to hear from you.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <FadeIn>
            <div className="space-y-4">
              {[
                { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                { label: "Location", value: contactInfo.location },
              ].map((item) => (
                <Card key={item.label} className="card-padded">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="link-primary text-lg">{item.value}</a>
                  ) : (
                    <p className="text-base" style={{ color: "var(--ink-soft)" }}>{item.value}</p>
                  )}
                </Card>
              ))}
              <Card className="card-padded">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>Social</p>
                <div className="flex flex-col gap-3">
                  {contactInfo.social.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="link-primary">{link.label} →</a>
                  ))}
                </div>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="card-padded">
              {sent ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                  <div className="empty-state-icon mx-auto mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2 className="text-2xl font-bold mb-2">Message ready to send</h2>
                  <p className="text-base mb-6" style={{ color: "var(--muted)" }}>Your email client should open with your message.</p>
                  <Button variant="secondary" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>Send another</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <FloatingInput label="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} error={errors.name} required />
                  <FloatingInput label="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} error={errors.email} required />
                  <FloatingInput label="Message" as="textarea" value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} error={errors.message} required />
                  <Button type="submit" variant="dark" disabled={loading} className={loading ? "btn-loading" : ""}>Send Message</Button>
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
