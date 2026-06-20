import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FadeIn from "../components/ui/FadeIn";
import { addPodcastRequest, PODCAST_REQUEST_EVENT } from "../utils/podcastRequests";
import { guestRequirements, guestFaqs } from "../data/siteContent";

const GuestForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    title: "",
    date: "",
    theme: "",
    notes: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [error, setError] = useState("");

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

    try {
      const [photoData, profileData] = await Promise.all([
        toDataUrl(photoFile),
        toDataUrl(profileFile),
      ]);

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
        [
          "New Willing to Podcast form submission",
          "",
          `Name: ${form.fullName}`,
          `Email: ${form.email}`,
          `Title: ${form.title}`,
          `Preferred Date: ${form.date}`,
          `Theme: ${form.theme}`,
          `Photo File: ${photoFile.name}`,
          `Profile File: ${profileFile.name}`,
          "",
          "Notes:",
          form.notes || "N/A",
        ].join("\n")
      );

      window.location.href = `mailto:riseonpodcast@gmail.com?subject=${subject}&body=${body}`;
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
      <div>
        <label className="form-label" htmlFor="guest-name">Full Name</label>
        <input id="guest-name" className="form-input" type="text" required value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} />
      </div>
      <div>
        <label className="form-label" htmlFor="guest-email">Email</label>
        <input id="guest-email" className="form-input" type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
      </div>
      <div>
        <label className="form-label" htmlFor="guest-title">Episode Title</label>
        <input id="guest-title" className="form-input" type="text" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
      </div>
      <div>
        <label className="form-label" htmlFor="guest-date">Preferred Date</label>
        <input id="guest-date" className="form-input" type="date" required value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
      </div>
      <div className="sm:col-span-2">
        <label className="form-label" htmlFor="guest-theme">Theme</label>
        <input id="guest-theme" className="form-input" type="text" required placeholder="e.g. Overcoming stage fear, leadership" value={form.theme} onChange={(e) => setForm((p) => ({ ...p, theme: e.target.value }))} />
      </div>
      <div>
        <label className="form-label" htmlFor="guest-photo">Photo</label>
        <input id="guest-photo" className="form-input" type="file" accept="image/*" required onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
      </div>
      <div>
        <label className="form-label" htmlFor="guest-profile">Profile Attachment</label>
        <input id="guest-profile" className="form-input" type="file" accept=".pdf,.doc,.docx,image/*" required onChange={(e) => setProfileFile(e.target.files?.[0] || null)} />
      </div>
      <div className="sm:col-span-2">
        <label className="form-label" htmlFor="guest-notes">Additional Details</label>
        <textarea id="guest-notes" className="form-input resize-y min-h-[7rem]" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} placeholder="Optional context for the admin team." />
      </div>
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <Button type="submit" variant="dark">Submit Application</Button>
        {error && <p className="text-sm font-medium" style={{ color: "#dc2626" }}>{error}</p>}
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
            <div className="empty-state-icon mx-auto mb-6" style={{ width: "4rem", height: "4rem" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="page-title mb-4">Application submitted!</h1>
            <p className="section-lead mx-auto mb-8">
              Thank you for applying. Our team will review your submission and reach out via email within 5–7 business days.
            </p>
            <Button to="/">Back to Home</Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero section-space--tight">
        <div className="site-container">
          <FadeIn>
            <p className="section-eyebrow">Become a Guest</p>
            <h1 className="page-title">Share your story with RiseOnPodcast</h1>
            <p className="page-lead">
              Have a story worth telling? Submit your application and inspire introverts across India.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <FadeIn>
            <h2 className="text-2xl mb-4">Submission requirements</h2>
            <ul className="space-y-3 mb-8">
              {guestRequirements.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                  <span className="check-icon">✓</span>
                  {item} required
                </li>
              ))}
            </ul>
            <a href="mailto:riseonpodcast@gmail.com" className="footer-link font-semibold">
              riseonpodcast@gmail.com
            </a>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="card-padded">
              <GuestForm onSuccess={() => setSubmitted(true)} />
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="site-container max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-3">
              {guestFaqs.map((faq, i) => (
                <Card key={faq.q} className="overflow-hidden">
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="faq-answer">
                      {faq.a}
                    </motion.div>
                  )}
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
