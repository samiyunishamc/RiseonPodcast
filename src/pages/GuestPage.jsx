import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import FloatingInput from "../components/ui/FloatingInput";
import { addPodcastRequest, PODCAST_REQUEST_EVENT } from "../utils/podcastRequests";
import { guestRequirements, guestFaqs } from "../data/siteContent";

const GuestForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ fullName: "", email: "", title: "", date: "", theme: "", notes: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Unable to read attachment."));
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoFile || !profileFile) {
      setError("Please attach both photo and profile files.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [photoData, profileData] = await Promise.all([toDataUrl(photoFile), toDataUrl(profileFile)]);

      const request = {
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        ...form,
        photo: { name: photoFile.name, type: photoFile.type, size: photoFile.size, dataUrl: photoData },
        profile: { name: profileFile.name, type: profileFile.type, size: profileFile.size, dataUrl: profileData },
      };

      addPodcastRequest(request);
      window.dispatchEvent(new CustomEvent(PODCAST_REQUEST_EVENT, { detail: request }));

      const subject = encodeURIComponent(`Podcast Form Submission - ${form.title}`);
      const body = encodeURIComponent(
        ["New Willing to Podcast form submission", "", `Name: ${form.fullName}`, `Email: ${form.email}`, `Title: ${form.title}`, `Preferred Date: ${form.date}`, `Theme: ${form.theme}`, `Photo: ${photoFile.name}`, `Profile: ${profileFile.name}`, "", "Notes:", form.notes || "N/A"].join("\n")
      );

      window.location.href = `mailto:riseonpodcast@gmail.com?subject=${subject}&body=${body}`;
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-x-5">
      <FloatingInput label="Full Name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} required />
      <FloatingInput label="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
      <FloatingInput label="Episode Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
      <FloatingInput label="Preferred Date" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
      <div className="sm:col-span-2">
        <FloatingInput label="Theme" value={form.theme} onChange={(e) => setForm((p) => ({ ...p, theme: e.target.value }))} required />
      </div>
      <div className="float-group sm:col-span-1">
        <label className="form-label-static" htmlFor="photo">Photo (Required)</label>
        <input id="photo" className="float-field" style={{ paddingTop: 12 }} type="file" accept="image/*" required onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
      </div>
      <div className="float-group sm:col-span-1">
        <label className="form-label-static" htmlFor="profile">Profile Attachment (Required)</label>
        <input id="profile" className="float-field" style={{ paddingTop: 12 }} type="file" accept=".pdf,.doc,.docx,image/*" required onChange={(e) => setProfileFile(e.target.files?.[0] || null)} />
      </div>
      <div className="sm:col-span-2">
        <FloatingInput label="Additional Details" as="textarea" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
      </div>
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
        <Button type="submit" variant="dark" disabled={loading} className={loading ? "btn-loading" : ""}>
          Submit Application
        </Button>
        {error && <p className="field-error" role="alert">{error}</p>}
      </div>
    </form>
  );
};

const GuestPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  if (submitted) {
    return (
      <section className="section-space">
        <div className="site-container max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="empty-state-icon mx-auto mb-6" style={{ width: 72, height: 72 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 className="page-title mb-4">Application submitted!</h1>
            <p className="section-lead mx-auto mb-8">Thank you. Our team will review your submission within 5–7 business days.</p>
            <Button to="/">Back to Home</Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <FadeIn>
            <span className="section-eyebrow">Become a Guest</span>
            <h1 className="page-title">Share your story with RiseOnPodcast</h1>
            <p className="page-lead">Have a story worth telling? Submit your application and inspire introverts across India.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">Submission requirements</h2>
            <ul className="space-y-3 mb-8">
              {guestRequirements.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-base" style={{ color: "var(--ink-soft)" }}>
                  <span className="check-icon">✓</span>{item} required
                </li>
              ))}
            </ul>
            <a href="mailto:riseonpodcast@gmail.com" className="link-primary">riseonpodcast@gmail.com</a>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="card-padded"><GuestForm onSuccess={() => setSubmitted(true)} /></Card>
          </FadeIn>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="site-container max-w-3xl">
          <FadeIn>
            <h2 className="section-title text-center mb-8">Frequently asked questions</h2>
            <div className="space-y-3">
              {guestFaqs.map((faq, i) => (
                <Card key={faq.q}>
                  <button type="button" className="faq-trigger" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span><span aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="faq-answer">{faq.a}</motion.div>}
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default GuestPage;
