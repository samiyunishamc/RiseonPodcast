const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "upcoming", label: "Upcoming" },
  { id: "podcasts", label: "Episodes" },
  { id: "contact", label: "Contact" },
];

const social = [
  {
    label: "YouTube",
    href: "https://youtube.com/@RiseOnPodcast",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/riseonpodcast",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:riseonpodcast@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Footer = () => {
  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div className="site-container section-space--tight">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="avatar avatar--sm gradient-indigo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                </svg>
              </span>
              <span className="font-extrabold text-lg tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                RiseOnPodcast
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
              Minimal conversations with maximum impact — built for introverts and aspiring speakers across India.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5 items-start" aria-label="Footer navigation">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => jump(link.id)}
                  className="footer-link bg-transparent border-none cursor-pointer p-0"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="footer-link flex items-center gap-2.5 no-underline"
                >
                  <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
        >
          <p>© {new Date().getFullYear()} RiseOnPodcast. All rights reserved.</p>
          <p>A RiseWithMedia production</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
