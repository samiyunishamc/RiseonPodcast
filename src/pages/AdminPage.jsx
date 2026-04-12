import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
//  Admin Panel — Manage Speakers & Episodes
//  Password-protected, local state (no backend)
// ==========================================

const ADMIN_USERNAME = "admin"; // Change this
const ADMIN_PASSWORD = "riseonpodcast2026"; // Change this

// ----- Tag options -----
const TAG_OPTIONS = [
  { label: "Stage Confidence", color: "bg-purple-500/20 text-purple-300" },
  { label: "Mindset", color: "bg-blue-500/20 text-blue-300" },
  { label: "Fear Management", color: "bg-pink-500/20 text-pink-300" },
  { label: "Authenticity", color: "bg-amber-500/20 text-amber-300" },
  { label: "Confidence", color: "bg-sky-500/20 text-sky-300" },
  { label: "Introvert Journey", color: "bg-emerald-500/20 text-emerald-300" },
  { label: "Storytelling", color: "bg-rose-500/20 text-rose-300" },
  { label: "Neuroscience", color: "bg-cyan-500/20 text-cyan-300" },
  { label: "Inspiration", color: "bg-orange-500/20 text-orange-300" },
];

// ----- Gradient options for upcoming speaker avatars -----
const AVATAR_GRADIENTS = [
  "from-purple-600 to-indigo-600",
  "from-blue-600 to-cyan-600",
  "from-pink-600 to-rose-600",
  "from-amber-600 to-orange-600",
  "from-emerald-600 to-teal-600",
  "from-violet-600 to-purple-600",
];

// =============================
//  Toast notification
// =============================
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl flex items-center gap-3 ${type === "success"
        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
        : "bg-red-500/20 border border-red-500/40 text-red-300"
      }`}
    style={{ backdropFilter: "blur(16px)" }}
  >
    <span>{type === "success" ? "✓" : "✕"}</span>
    {message}
    <button onClick={onClose} className="ml-2 text-white/50 hover:text-white bg-transparent border-none cursor-pointer">
      ×
    </button>
  </motion.div>
);

// =============================
//  Login Screen
// =============================
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect username or password. Please try again.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #080614 0%, #0f0736 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-3xl p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>
                Admin Panel
              </p>
              <p className="text-purple-400 text-xs">RiseOnPodcast</p>
            </div>
          </div>

          <h1 className="text-2xl font-black text-white text-center mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm text-center mb-8">
            Sign in to manage speakers and episodes
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-base">
              Sign In →
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// =============================
//  Form Input Component
// =============================
const FormInput = ({ label, value, onChange, placeholder, type = "text", required }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
      {label} {required && <span className="text-purple-400">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "Inter, sans-serif",
      }}
      onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
    />
  </div>
);

const FormTextarea = ({ label, value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
      {label} {required && <span className="text-purple-400">*</span>}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={3}
      className="w-full px-4 py-2.5 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "Inter, sans-serif",
      }}
      onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
    />
  </div>
);

// =============================
//  Add Episode Form
// =============================
const AddEpisodeForm = ({ episodes, setEpisodes, showToast }) => {
  const empty = {
    title: "",
    speaker: "",
    description: "",
    youtubeUrl: "",
    tag: TAG_OPTIONS[0].label,
    duration: "",
  };
  const [form, setForm] = useState(empty);

  const selectedTag = TAG_OPTIONS.find((t) => t.label === form.tag);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEp = {
      id: Date.now(),
      ...form,
      thumbnail: "", // will be auto-fetched from YouTube if youtubeUrl is valid
      instagramUrl: "https://www.instagram.com/risewithmedia.podcast",
      tagColor: selectedTag?.color || TAG_OPTIONS[0].color,
      views: "—",
    };

    // Try to extract YouTube thumbnail from URL
    const ytMatch = form.youtubeUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) {
      newEp.thumbnail = `https://i.ytimg.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }

    setEpisodes([...episodes, newEp]);
    setForm(empty);
    showToast("Episode added successfully!", "success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Episode Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Breaking the Ice" required />
        <FormInput label="Speaker Name" value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} placeholder="e.g. Rahul Verma" required />
      </div>

      <FormTextarea label="Episode Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the episode..." required />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="YouTube Video URL"
          value={form.youtubeUrl}
          onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
          type="url"
          required
        />
        <FormInput label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 42 min" />
      </div>

      {/* Tag selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Episode Tag <span className="text-purple-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setForm({ ...form, tag: t.label })}
              className={`tag-pill cursor-pointer border-none transition-all ${t.color} ${form.tag === t.label ? "ring-2 ring-purple-400 ring-offset-1 ring-offset-transparent" : "opacity-60"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary w-full py-3">
        + Add Episode
      </button>
    </form>
  );
};

// =============================
//  Add Upcoming Speaker Form
// =============================
const AddSpeakerForm = ({ speakers, setSpeakers, showToast }) => {
  const empty = { speaker: "", topic: "", date: "", time: "", tag: TAG_OPTIONS[0].label };
  const [form, setForm] = useState(empty);

  const selectedTag = TAG_OPTIONS.find((t) => t.label === form.tag);

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = form.speaker
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
    const newSpeaker = {
      id: Date.now(),
      ...form,
      tagColor: selectedTag?.color || TAG_OPTIONS[0].color,
      speakerInitials: initials || "SP",
      avatarGradient: AVATAR_GRADIENTS[speakers.length % AVATAR_GRADIENTS.length],
    };
    setSpeakers([...speakers, newSpeaker]);
    setForm(empty);
    showToast("Speaker added successfully!", "success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Speaker Name" value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} placeholder="e.g. Priya Nair" required />
        <FormInput label="Episode Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Quiet Power" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. April 28, 2026" required />
        <FormInput label="Time (IST)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 7:00 PM IST" required />
      </div>

      {/* Tag selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tag</label>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setForm({ ...form, tag: t.label })}
              className={`tag-pill cursor-pointer border-none transition-all ${t.color} ${form.tag === t.label ? "ring-2 ring-purple-400 ring-offset-1 ring-offset-transparent" : "opacity-60"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary w-full py-3">
        + Add Speaker
      </button>
    </form>
  );
};

// =============================
//  Episode Card (Admin List)
// =============================
const EpisodeAdminCard = ({ ep, onDelete }) => (
  <div
    className="flex items-start gap-4 p-4 rounded-2xl group"
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    {/* Thumbnail */}
    <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-600/30 to-blue-600/20 flex items-center justify-center">
      {ep.thumbnail ? (
        <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      )}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
        {ep.title}
      </p>
      <p className="text-purple-300 text-xs mt-0.5">{ep.speaker}</p>
      <a href={ep.youtubeUrl} target="_blank" rel="noreferrer" className="text-blue-400 text-xs mt-1 inline-block truncate max-w-[200px] no-underline hover:underline">
        {ep.youtubeUrl}
      </a>
    </div>

    {/* Delete */}
    <button
      onClick={() => onDelete(ep.id)}
      className="text-slate-600 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </button>
  </div>
);

// =============================
//  Speaker Admin Card
// =============================
const SpeakerAdminCard = ({ sp, onDelete }) => (
  <div
    className="flex items-center gap-3 p-3 rounded-xl group"
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sp.avatarGradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {sp.speakerInitials}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white text-sm font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>
        {sp.speaker}
      </p>
      <p className="text-slate-400 text-xs truncate">{sp.topic}</p>
      <p className="text-purple-300 text-xs">{sp.date} · {sp.time}</p>
    </div>
    <button onClick={() => onDelete(sp.id)} className="text-slate-600 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </button>
  </div>
);

// =============================
//  Main Admin Page
// =============================
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("episodes");
  const [episodes, setEpisodes] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const deleteEpisode = (id) => {
    setEpisodes(episodes.filter((e) => e.id !== id));
    showToast("Episode removed.", "success");
  };

  const deleteSpeaker = (id) => {
    setSpeakers(speakers.filter((s) => s.id !== id));
    showToast("Speaker removed.", "success");
  };

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;

  const tabs = [
    { id: "episodes", label: "Episodes", icon: "🎙️", count: episodes.length },
    { id: "speakers", label: "Upcoming Speakers", icon: "👤", count: speakers.length },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #080614 0%, #0f0736 100%)" }}
    >
      {/* Admin Navbar */}
      <nav
        className="sticky top-0 z-50 glass border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-base" style={{ fontFamily: "Outfit, sans-serif" }}>
                RiseOnPodcast
              </p>
              <p className="text-purple-400 text-xs">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors no-underline flex items-center gap-1.5"
            >
              ← View Website
            </a>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="btn-outline text-sm !py-2 !px-4"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            Content Manager
          </h1>
          <p className="text-slate-400 text-sm">
            Upload speaker episodes and manage upcoming conversations
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Episodes", value: episodes.length, icon: "🎙️" },
            { label: "Upcoming Speakers", value: speakers.length, icon: "👤" },
            { label: "YouTube Links", value: episodes.filter(e => e.youtubeUrl).length, icon: "▶️" },
            { label: "Published Tags", value: [...new Set(episodes.map(e => e.tag))].length, icon: "🏷️" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                {s.value}
              </p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl w-fit" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border-none cursor-pointer ${activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white bg-transparent"
                }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? "bg-white/20" : "bg-purple-500/20 text-purple-400"
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ===== EPISODES TAB ===== */}
        <AnimatePresence mode="wait">
          {activeTab === "episodes" && (
            <motion.div
              key="episodes"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Add Form */}
              <div
                className="rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <span className="text-2xl">🎙️</span> Add New Episode
                </h2>
                <AddEpisodeForm episodes={episodes} setEpisodes={setEpisodes} showToast={showToast} />
              </div>

              {/* Episodes List */}
              <div
                className="rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h2 className="text-white font-bold text-lg mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Published Episodes{" "}
                  <span className="text-slate-500 text-sm font-normal">({episodes.length})</span>
                </h2>
                {episodes.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-5xl mb-4">🎙️</p>
                    <p className="text-slate-400 text-sm">No episodes yet. Add your first one!</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                    {episodes.map((ep) => (
                      <EpisodeAdminCard key={ep.id} ep={ep} onDelete={deleteEpisode} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ===== SPEAKERS TAB ===== */}
          {activeTab === "speakers" && (
            <motion.div
              key="speakers"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Add Form */}
              <div
                className="rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <span className="text-2xl">👤</span> Add Upcoming Speaker
                </h2>
                <AddSpeakerForm speakers={speakers} setSpeakers={setSpeakers} showToast={showToast} />
              </div>

              {/* Speakers List */}
              <div
                className="rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h2 className="text-white font-bold text-lg mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Upcoming Speakers{" "}
                  <span className="text-slate-500 text-sm font-normal">({speakers.length})</span>
                </h2>
                {speakers.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-5xl mb-4">👤</p>
                    <p className="text-slate-400 text-sm">No speakers added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                    {speakers.map((sp) => (
                      <SpeakerAdminCard key={sp.id} sp={sp} onDelete={deleteSpeaker} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notice */}
        <div
          className="mt-8 p-4 rounded-2xl flex items-start gap-3"
          style={{
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <span className="text-purple-400 text-lg flex-shrink-0">ℹ️</span>
          <p className="text-purple-300/70 text-sm leading-relaxed">
            <strong className="text-purple-300">Note:</strong> Data added here is stored in browser memory for this session.
            To make it permanent, connect a backend database or copy the generated data into{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">src/data/podcastData.js</code>.
          </p>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
