import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "upcoming", label: "Upcoming" },
  { id: "podcasts", label: "Episodes" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = [...links].reverse();
      for (const link of ids) {
        const node = document.getElementById(link.id);
        if (node && window.scrollY >= node.offsetTop - 120) {
          setActive(link.id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250, 249, 247, 0.92)" : "rgba(250, 249, 247, 0.75)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="site-container flex items-center justify-between" style={{ height: "var(--nav-height)" }}>
        <button
          onClick={() => jump("home")}
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0"
          aria-label="RiseOnPodcast home"
        >
          <span className="avatar avatar--sm gradient-indigo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </span>
          <span className="font-extrabold text-[1.05rem] tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            RiseOn<span style={{ color: "var(--accent)" }}>Podcast</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => jump(link.id)}
              className={`nav-link ${active === link.id ? "active" : ""}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://youtube.com/@RiseOnPodcast"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm"
          >
            YouTube
          </a>
          <button onClick={() => jump("contact")} className="btn btn-primary btn-sm">
            Be a Guest
          </button>
        </div>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden bg-transparent border-none p-2 cursor-pointer rounded-lg"
          style={{ color: "var(--ink)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}
            aria-label="Mobile navigation"
          >
            <div className="site-container py-4 flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => jump(link.id)}
                  className="text-left py-3 px-2 bg-transparent border-none font-semibold rounded-lg transition-colors"
                  style={{
                    color: active === link.id ? "var(--accent-dark)" : "var(--ink-soft)",
                    background: active === link.id ? "var(--accent-soft)" : "transparent",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-3 mt-2" style={{ borderTop: "1px solid var(--line)" }}>
                <a
                  href="https://youtube.com/@RiseOnPodcast"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary w-full"
                >
                  Watch on YouTube
                </a>
                <button onClick={() => jump("contact")} className="btn btn-primary w-full">
                  Be a Guest
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
