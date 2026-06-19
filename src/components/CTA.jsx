import { useState } from "react";
import { motion } from "framer-motion";
import { addPodcastRequest, PODCAST_REQUEST_EVENT } from "../utils/podcastRequests";

const CTA = () => {
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
  const [status, setStatus] = useState("");

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
      setStatus("Please attach both photo and profile files.");
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
        photo: {
          name: photoFile.name,
          type: photoFile.type,
          size: photoFile.size,
          dataUrl: photoData,
        },
        profile: {
          name: profileFile.name,
          type: profileFile.type,
          size: profileFile.size,
          dataUrl: profileData,
        },
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

      setForm({ fullName: "", email: "", title: "", date: "", theme: "", notes: "" });
      setPhotoFile(null);
      setProfileFile(null);
      setStatus("Submitted successfully. Sent to admin dashboard and email draft.");
    } catch (error) {
      setStatus(error.message || "Submission failed. Please try again.");
    }
  };

  const requiredFields = [
    "Title",
    "Date",
    "Theme",
    "Photo",
    "Profile Attachment",
  ];

  return (
    <section id="contact" className="section-space section-alt">
      <div className="site-container">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="lg:sticky lg:top-28"
          >
            <p className="section-eyebrow">Willing To Podcast</p>
            <h2 className="section-title">Share your story with RiseOnPodcast</h2>
            <p className="section-lead mb-8">
              Have a story worth telling? Submit your podcast request and our team will review your application.
            </p>

            <ul className="space-y-3 mb-8">
              {requiredFields.map((field) => (
                <li key={field} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                  <span
                    className="w-5 h-5 rounded-full grid place-items-center flex-shrink-0"
                    style={{ background: "var(--accent-soft)", color: "var(--accent-dark)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {field} required
                </li>
              ))}
            </ul>

            <a href="mailto:riseonpodcast@gmail.com" className="footer-link font-semibold">
              riseonpodcast@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1 }}
            className="card card-padded"
          >
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  className="form-input"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="title">Episode Title</label>
                <input
                  id="title"
                  className="form-input"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="date">Preferred Date</label>
                <input
                  id="date"
                  className="form-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="form-label" htmlFor="theme">Theme</label>
                <input
                  id="theme"
                  className="form-input"
                  type="text"
                  placeholder="e.g. Overcoming stage fear, leadership, storytelling"
                  value={form.theme}
                  onChange={(e) => setForm((prev) => ({ ...prev, theme: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="photo">Photo</label>
                <input
                  id="photo"
                  className="form-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="profile">Profile Attachment</label>
                <input
                  id="profile"
                  className="form-input"
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="form-label" htmlFor="notes">Additional Details</label>
                <textarea
                  id="notes"
                  className="form-input resize-y min-h-[7rem]"
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Optional context for the admin team."
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <button type="submit" className="btn btn-dark">
                  Submit Application
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {status && (
                  <p className="text-sm font-medium" style={{ color: "var(--accent-dark)" }}>
                    {status}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
