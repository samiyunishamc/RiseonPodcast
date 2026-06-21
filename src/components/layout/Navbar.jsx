import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/episodes", label: "Episodes" },
  { to: "/sessions", label: "Sessions" },
  { to: "/contact", label: "Contact" },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 no-underline" aria-label="RiseOnPodcast home">
    <span className="avatar avatar--sm gradient-indigo">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
      </svg>
    </span>
    <span className="font-extrabold text-[1.05rem] tracking-tight">
      RiseOn<span style={{ color: "var(--primary)" }}>Podcast</span>
    </span>
  </Link>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="site-container navbar-inner">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/guest" size="sm">Become a Guest</Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden navbar-toggle"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              className="mobile-drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between mb-6">
                <Logo />
                <button type="button" className="navbar-toggle" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? "mobile-nav-link--active" : ""}`}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-auto pt-6">
                <Button to="/guest" className="w-full" onClick={() => setMenuOpen(false)}>
                  Become a Guest
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
