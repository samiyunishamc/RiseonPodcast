import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/sessions", label: "Sessions" },
  { to: "/guest", label: "Become a Guest" },
  { to: "/contact", label: "Contact" },
];

const episodeLinks = [
  { to: "/episodes", label: "All Episodes" },
  { href: "https://youtube.com/@RiseOnPodcast", label: "YouTube Channel" },
];

const social = [
  {
    label: "YouTube",
    href: "https://youtube.com/@RiseOnPodcast",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/riseonpodcast",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:riseonpodcast@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-grid grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          <div className="footer-section lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="avatar avatar--sm gradient-indigo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                </svg>
              </span>
              <span className="font-extrabold text-lg text-white">RiseOnPodcast</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 footer-text" style={{ color: "rgba(255,255,255,0.55)" }}>
              Minimal conversations with maximum impact — built for introverts and aspiring speakers across India.
            </p>
            <div className="flex gap-2 flex-wrap">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="social-icon-btn"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-heading">Quick Links</p>
            <nav className="flex flex-col gap-3" aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="footer-link">{link.label}</Link>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <p className="footer-heading">Episodes</p>
            <nav className="flex flex-col gap-3" aria-label="Footer episode links">
              {episodeLinks.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} className="footer-link">{link.label}</Link>
                ) : (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="footer-link">{link.label}</a>
                )
              )}
            </nav>
            <p className="footer-heading footer-heading--spaced">Contact</p>
            <a href="mailto:riseonpodcast@gmail.com" className="footer-link footer-link--email">riseonpodcast@gmail.com</a>
            <p className="text-sm mt-2 footer-text" style={{ color: "rgba(255,255,255,0.45)" }}>India · Remote Sessions</p>
          </div>

          <div className="footer-section">
            <p className="footer-heading">Newsletter</p>
            <p className="text-sm mb-4 footer-text" style={{ color: "rgba(255,255,255,0.55)" }}>
              Get notified about new episodes and upcoming sessions.
            </p>
            {subscribed ? (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold" style={{ color: "#a5b4fc" }}>
                ✓ You're subscribed. Thank you!
              </motion.p>
            ) : (
              <form onSubmit={handleNewsletter} className="newsletter-input">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                />
                <Button type="submit" size="sm" className="newsletter-submit">Join</Button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RiseOnPodcast. All rights reserved.</p>
          <p>A RiseWithMedia production</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
