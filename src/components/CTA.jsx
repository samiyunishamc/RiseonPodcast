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

      setForm({
        fullName: "",
        email: "",
        title: "",
        date: "",
        theme: "",
        notes: "",
      });
      setPhotoFile(null);
      setProfileFile(null);
      setStatus("Submitted successfully. Sent to Admin dashboard and email draft.");
    } catch (error) {
      setStatus(error.message || "Submission failed. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-space">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="panel p-8 sm:p-12"
          style={{ background: "linear-gradient(145deg, #ffffff 0%, #f4eeff 100%)" }}
        >
          <span className="kicker mb-5">Willing To Podcast</span>
          <h2 className="section-title mb-4">Share your story with RiseOnPodcast</h2>
          <p className="section-lead mb-8">
            Submit your podcast request form. Required: title, date, theme, photo, and profile attachment.
          </p>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 text-left">
            <label className="text-sm font-semibold text-[#2f2f2f]">
              Full Name
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f]">
              Email
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f]">
              Title
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f]">
              Date
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f] sm:col-span-2">
              Theme
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="text"
                value={form.theme}
                onChange={(e) => setForm((prev) => ({ ...prev, theme: e.target.value }))}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f]">
              Photo (Required)
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f]">
              Profile Attachment (Required)
              <input
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none"
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
                required
              />
            </label>

            <label className="text-sm font-semibold text-[#2f2f2f] sm:col-span-2">
              Additional Details
              <textarea
                className="mt-1.5 w-full rounded-xl border border-[#ded3fb] bg-white px-3 py-2.5 outline-none resize-y min-h-[6.5rem]"
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Optional context for the admin team."
              />
            </label>

            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button type="submit" className="btn-glow">
                Submit Form
              </button>
              {status && <p className="text-sm text-[#5f4aa4]">{status}</p>}
            </div>
          </form>

          <div className="flex flex-wrap gap-2 mt-8">
            {[
              "Title Required",
              "Date Required",
              "Theme Required",
              "Photo Required",
              "Profile Attachment Required",
            ].map((line) => (
              <span className="tag-pill" key={line}>
                {line}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
