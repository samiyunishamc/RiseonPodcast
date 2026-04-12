import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "upcoming", label: "Upcoming" },
  { id: "podcasts", label: "Podcasts" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = [...links].reverse();
      for (const link of ids) {
        const node = document.getElementById(link.id);
        if (node && window.scrollY >= node.offsetTop - 140) {
          setActive(link.id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
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
        background: scrolled ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.62)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(222, 211, 251, 0.7)",
      }}
    >
      <div className="site-container h-[74px] flex items-center justify-between">
        <button
          onClick={() => jump("home")}
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0"
        >
          <span
            className="w-9 h-9 rounded-xl grid place-items-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6d3ce6 100%)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </span>
          <span className="font-extrabold text-[1.2rem] text-[#121212]">RiseOnPodcast</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
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

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden bg-transparent border-none p-1.5 cursor-pointer"
        >
          <div className="w-6 h-[2px] bg-[#171717] mb-1.5" />
          <div className="w-6 h-[2px] bg-[#171717] mb-1.5" />
          <div className="w-6 h-[2px] bg-[#171717]" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="md:hidden"
            style={{ borderTop: "1px solid rgba(222, 211, 251, 0.7)", background: "#ffffff" }}
          >
            <div className="site-container py-4 flex flex-col gap-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => jump(link.id)}
                  className="text-left py-2 bg-transparent border-none text-[#1f1f1f] font-semibold"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
