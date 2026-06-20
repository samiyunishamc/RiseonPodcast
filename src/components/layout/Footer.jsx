import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/episodes", label: "Episodes" },
  { to: "/sessions", label: "Sessions" },
  { to: "/guest", label: "Become a Guest" },
  { to: "/contact", label: "Contact" },
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
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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

const Footer = () => (
  <footer className="footer">
    <div className="site-container section-space--tight">
      <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-10">
        <div>
          <p className="font-extrabold text-lg mb-3">RiseOnPodcast</p>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
            Minimal conversations with maximum impact — built for introverts and aspiring speakers across India.
          </p>
        </div>

        <div>
          <p className="footer-heading">Navigation</p>
          <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="footer-heading">Connect</p>
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

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RiseOnPodcast. All rights reserved.</p>
        <p>A RiseWithMedia production</p>
      </div>
    </div>
  </footer>
);

export default Footer;
