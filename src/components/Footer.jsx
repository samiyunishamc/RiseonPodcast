const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "upcoming", label: "Upcoming" },
  { id: "podcasts", label: "Podcasts" },
  { id: "contact", label: "Contact" },
];

const Footer = () => {
  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="pt-8 pb-10" style={{ borderTop: "1px solid #ded3fb" }}>
      <div className="site-container grid md:grid-cols-3 gap-8 items-start">
        <div>
          <p className="font-extrabold text-lg mb-2">RiseOnPodcast</p>
          <p className="text-sm text-[#6b7280] max-w-xs">
            Minimal conversations with maximum impact for introverts and aspiring speakers.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-3">Navigation</p>
          <div className="flex flex-col gap-2 items-start">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => jump(link.id)}
                className="footer-link bg-transparent border-none cursor-pointer p-0"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3">Connect</p>
          <div className="flex flex-col gap-2 text-sm text-[#6b7280]">
            <a className="footer-link" href="mailto:riseonpodcast@gmail.com">riseonpodcast@gmail.com</a>
            <a className="footer-link" href="https://youtube.com/@RiseOnPodcast" target="_blank" rel="noreferrer">YouTube</a>
            <a className="footer-link" href="https://www.instagram.com/riseonpodcast" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="site-container mt-8 pt-5 text-xs text-[#6b7280]" style={{ borderTop: "1px solid #ede4ff" }}>
        Copyright {new Date().getFullYear()} RiseOnPodcast. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
