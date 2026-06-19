import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getPodcastRequests,
  PODCAST_REQUEST_EVENT,
  removePodcastRequest,
} from "../utils/podcastRequests";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "riseonpodcast2026";

const TAG_OPTIONS = [
  { label: "Stage Confidence", color: "bg-indigo-500/20 text-indigo-300" },
  { label: "Mindset", color: "bg-blue-500/20 text-blue-300" },
  { label: "Fear Management", color: "bg-pink-500/20 text-pink-300" },
  { label: "Authenticity", color: "bg-amber-500/20 text-amber-300" },
  { label: "Confidence", color: "bg-sky-500/20 text-sky-300" },
  { label: "Introvert Journey", color: "bg-emerald-500/20 text-emerald-300" },
  { label: "Storytelling", color: "bg-rose-500/20 text-rose-300" },
];

const AVATAR_GRADIENTS = [
  "from-indigo-600 to-violet-600",
  "from-blue-600 to-cyan-600",
  "from-pink-600 to-rose-600",
  "from-amber-600 to-orange-600",
  "from-emerald-600 to-teal-600",
  "from-violet-600 to-purple-600",
];

const formatBytes = (bytes = 0) => {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  const value = bytes / 1024 ** i;
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl flex items-center gap-3 ${
      type === "success"
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

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
      return;
    }
    setError("Incorrect username or password. Please try again.");
    setUsername("");
    setPassword("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--hero-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-2xl p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="avatar avatar--sm gradient-indigo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              </svg>
            </span>
            <div>
              <h1 className="text-xl font-bold text-white m-0">RiseOnPodcast</h1>
              <p className="text-indigo-300 text-xs m-0">Admin Panel</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm text-white/60">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </label>

            <label className="block text-sm text-white/60">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </label>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const AdminInput = ({ label, value, onChange, placeholder, type = "text", required }) => (
  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider">
    {label} {required && <span className="text-indigo-400">*</span>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full mt-1.5 px-4 py-2.5 rounded-xl text-white text-sm outline-none font-normal normal-case tracking-normal"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    />
  </label>
);

const AdminTextarea = ({ label, value, onChange, placeholder, required }) => (
  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider">
    {label} {required && <span className="text-indigo-400">*</span>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={3}
      className="w-full mt-1.5 px-4 py-2.5 rounded-xl text-white text-sm outline-none resize-none font-normal normal-case tracking-normal"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    />
  </label>
);

const AddEpisodeForm = ({ episodes, setEpisodes, showToast }) => {
  const empty = { title: "", speaker: "", description: "", youtubeUrl: "", tag: TAG_OPTIONS[0].label, duration: "" };
  const [form, setForm] = useState(empty);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTag = TAG_OPTIONS.find((t) => t.label === form.tag) || TAG_OPTIONS[0];
    const ytMatch = form.youtubeUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
    );

    const newEpisode = {
      id: Date.now(),
      ...form,
      thumbnail: ytMatch ? `https://i.ytimg.com/vi/${ytMatch[1]}/hqdefault.jpg` : "",
      instagramUrl: "https://www.instagram.com/risewithmedia.podcast",
      tagColor: selectedTag.color,
      views: "-",
    };

    setEpisodes([...episodes, newEpisode]);
    setForm(empty);
    showToast("Episode added successfully.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInput label="Episode Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <AdminInput label="Speaker Name" value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} required />
      </div>
      <AdminTextarea label="Episode Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInput label="YouTube Video URL" type="url" value={form.youtubeUrl} onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })} required />
        <AdminInput label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
      </div>
      <div>
        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Episode Tag</p>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => setForm({ ...form, tag: tag.label })}
              className={`tag border-none cursor-pointer ${tag.color} ${form.tag === tag.label ? "ring-2 ring-indigo-400" : "opacity-60"}`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full">+ Add Episode</button>
    </form>
  );
};

const AddSpeakerForm = ({ speakers, setSpeakers, showToast }) => {
  const empty = { speaker: "", topic: "", date: "", time: "", tag: TAG_OPTIONS[0].label };
  const [form, setForm] = useState(empty);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTag = TAG_OPTIONS.find((t) => t.label === form.tag) || TAG_OPTIONS[0];
    const initials = form.speaker.split(" ").map((word) => word[0]?.toUpperCase()).join("").slice(0, 2);

    const newSpeaker = {
      id: Date.now(),
      ...form,
      speakerInitials: initials || "SP",
      tagColor: selectedTag.color,
      avatarGradient: AVATAR_GRADIENTS[speakers.length % AVATAR_GRADIENTS.length],
    };

    setSpeakers([...speakers, newSpeaker]);
    setForm(empty);
    showToast("Speaker added successfully.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInput label="Speaker Name" value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} required />
        <AdminInput label="Episode Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInput label="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <AdminInput label="Time (IST)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
      </div>
      <div>
        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Tag</p>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => setForm({ ...form, tag: tag.label })}
              className={`tag border-none cursor-pointer ${tag.color} ${form.tag === tag.label ? "ring-2 ring-indigo-400" : "opacity-60"}`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full">+ Add Speaker</button>
    </form>
  );
};

const RequestCard = ({ request, onDelete }) => (
  <article
    className="rounded-2xl p-5"
    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
  >
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <p className="text-white font-bold text-lg m-0">{request.title}</p>
        <p className="text-indigo-300 text-xs mt-1">Submitted: {formatDate(request.submittedAt)}</p>
      </div>
      <button onClick={() => onDelete(request.id)} className="btn btn-secondary btn-sm" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
        Delete
      </button>
    </div>

    <div className="grid sm:grid-cols-2 gap-3 text-sm">
      <p className="text-white/70"><span className="text-white/40">Name:</span> {request.fullName}</p>
      <p className="text-white/70"><span className="text-white/40">Email:</span> {request.email}</p>
      <p className="text-white/70"><span className="text-white/40">Date:</span> {request.date}</p>
      <p className="text-white/70"><span className="text-white/40">Theme:</span> {request.theme}</p>
    </div>

    {request.notes && (
      <div className="mt-3">
        <p className="text-white/40 text-xs uppercase tracking-wide">Additional Details</p>
        <p className="text-white/70 text-sm mt-1">{request.notes}</p>
      </div>
    )}

    <div className="grid sm:grid-cols-2 gap-3 mt-4">
      {["photo", "profile"].map((key) => (
        <div key={key} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-white/40 text-xs uppercase tracking-wide mb-1">{key === "photo" ? "Photo" : "Profile"}</p>
          <p className="text-white/70 text-sm truncate">{request[key]?.name || "-"}</p>
          <p className="text-white/40 text-xs mt-0.5">{formatBytes(request[key]?.size)}</p>
          {request[key]?.dataUrl && (
            <a href={request[key].dataUrl} download={request[key].name} className="text-indigo-300 text-xs no-underline hover:underline mt-2 inline-block">
              Download
            </a>
          )}
        </div>
      ))}
    </div>
  </article>
);

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("episodes");
  const [episodes, setEpisodes] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [requests, setRequests] = useState(() => getPodcastRequests());
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    const syncRequests = () => setRequests(getPodcastRequests());
    window.addEventListener("storage", syncRequests);
    window.addEventListener(PODCAST_REQUEST_EVENT, syncRequests);
    return () => {
      window.removeEventListener("storage", syncRequests);
      window.removeEventListener(PODCAST_REQUEST_EVENT, syncRequests);
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Episodes", value: episodes.length },
      { label: "Upcoming Speakers", value: speakers.length },
      { label: "Podcast Requests", value: requests.length },
      { label: "YouTube Links", value: episodes.filter((item) => item.youtubeUrl).length },
    ],
    [episodes, requests, speakers]
  );

  const tabs = [
    { id: "episodes", label: "Episodes", count: episodes.length },
    { id: "speakers", label: "Speakers", count: speakers.length },
    { id: "requests", label: "Requests", count: requests.length },
  ];

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="min-h-screen" style={{ background: "var(--hero-bg)" }}>
      <nav
        className="sticky top-0 z-50"
        style={{ background: "rgba(12,10,29,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="avatar avatar--sm gradient-indigo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              </svg>
            </span>
            <div>
              <p className="text-white font-bold text-sm m-0">RiseOnPodcast</p>
              <p className="text-indigo-400 text-xs m-0">Content Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/50 hover:text-white text-sm transition-colors no-underline">View Website</a>
            <button onClick={() => setIsLoggedIn(false)} className="btn btn-secondary btn-sm" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Dashboard</h1>
          <p className="text-white/50 text-sm">Manage episodes, speakers, and incoming podcast applications.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-2xl font-extrabold text-white m-0">{item.value}</p>
              <p className="text-xs text-white/40 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 p-1 rounded-2xl w-fit" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border-none cursor-pointer ${
                activeTab === tab.id ? "bg-indigo-600 text-white" : "text-white/40 hover:text-white bg-transparent"
              }`}
            >
              {tab.label} {tab.count > 0 && <span className="ml-1 text-xs opacity-70">({tab.count})</span>}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "episodes" && (
            <motion.div key="episodes" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <h2 className="text-white font-bold text-lg mb-5">Add New Episode</h2>
                <AddEpisodeForm episodes={episodes} setEpisodes={setEpisodes} showToast={showToast} />
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 className="text-white font-bold text-lg mb-5">Published Episodes</h2>
                {episodes.length === 0 ? (
                  <p className="text-white/40 text-sm">No episodes yet.</p>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {episodes.map((ep) => (
                      <article key={ep.id} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-white text-sm font-semibold m-0">{ep.title}</p>
                        <p className="text-indigo-300 text-xs mt-1">{ep.speaker}</p>
                        <button
                          onClick={() => { setEpisodes((prev) => prev.filter((item) => item.id !== ep.id)); showToast("Episode removed."); }}
                          className="btn btn-secondary btn-sm mt-3"
                          style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                        >
                          Delete
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "speakers" && (
            <motion.div key="speakers" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <h2 className="text-white font-bold text-lg mb-5">Add Upcoming Speaker</h2>
                <AddSpeakerForm speakers={speakers} setSpeakers={setSpeakers} showToast={showToast} />
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 className="text-white font-bold text-lg mb-5">Upcoming Speakers</h2>
                {speakers.length === 0 ? (
                  <p className="text-white/40 text-sm">No speakers yet.</p>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {speakers.map((sp) => (
                      <article key={sp.id} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sp.avatarGradient} text-white text-xs font-bold grid place-items-center`}>{sp.speakerInitials}</span>
                          <div>
                            <p className="text-white text-sm font-semibold m-0">{sp.speaker}</p>
                            <p className="text-white/40 text-xs">{sp.topic}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setSpeakers((prev) => prev.filter((item) => item.id !== sp.id)); showToast("Speaker removed."); }}
                          className="btn btn-secondary btn-sm mt-3"
                          style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                        >
                          Delete
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "requests" && (
            <motion.div key="requests" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              {requests.length === 0 ? (
                <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-white/50">No podcast form submissions yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onDelete={(id) => { setRequests(removePodcastRequest(id)); showToast("Podcast request removed."); }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
    </div>
  );
};

export default AdminPage;
