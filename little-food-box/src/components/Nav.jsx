import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Menu Card", href: "/menucard" },
  { label: "Contact", href: "/contact" },
];

export default function Nav({ activePage = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
          padding: 1.35rem 3rem;
        }

        .nav-root.at-top {
          background: transparent;
          box-shadow: none;
        }

        .nav-root.scrolled {
          background: #fffdf9;
          box-shadow: 0 1px 0 #e0d5c5, 0 4px 24px rgba(42,26,14,0.06);
          padding: 0.85rem 3rem;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Brand */
        .nav-brand {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .nav-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #2a1a0e;
          line-height: 1.1;
          transition: color 0.3s;
        }
        .nav-brand-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          color: #9a7d65;
          margin-top: 2px;
          transition: color 0.3s;
        }

        /* Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          color: #6b5440;
          font-weight: 500;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #b5451b;
          transition: width 0.25s ease;
        }
        .nav-links a:hover { color: #b5451b; }
        .nav-links a:hover::after { width: 100%; }
        .nav-links a.active {
          color: #b5451b;
          font-weight: 600;
        }
        .nav-links a.active::after { width: 100%; }

        /* CTA */
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 600;
          text-decoration: none;
          padding: 9px 20px;
          border-radius: 3px;
          background: #2a1a0e;
          color: #f5f0e8;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .nav-cta:hover { background: #b5451b; transform: translateY(-1px); }
        .nav-cta:active { transform: translateY(0); }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #2a1a0e;
          transition: transform 0.25s, opacity 0.25s;
          transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fffdf9;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.18, 1);
        }
        .nav-drawer.open { transform: translateY(0); }
        .nav-drawer a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #2a1a0e;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: -0.01em;
        }
        .nav-drawer a:hover, .nav-drawer a.active { color: #b5451b; }
        .nav-drawer .drawer-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9a7d65;
          margin-top: 1rem;
        }
        .nav-drawer .drawer-cta {
          margin-top: 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 12px 32px;
          background: #2a1a0e;
          color: #f5f0e8;
          border-radius: 3px;
          text-decoration: none;
        }

        /* Page offset so content doesn't hide behind fixed nav */
        .nav-offset { height: 72px; }

        @media (max-width: 768px) {
          .nav-root { padding: 1rem 1.5rem; }
          .nav-root.scrolled { padding: 0.75rem 1.5rem; }
          .nav-links, .nav-cta { display: none !important; }
          .nav-hamburger { display: flex; }
          .nav-offset { height: 60px; }
        }
      `}</style>

      {/* Offset spacer */}
      <div className="nav-offset" />

      {/* Navbar */}
      <nav className={`nav-root ${scrolled ? "scrolled" : "at-top"}`}>
        <div className="nav-inner">
          {/* Brand */}
          <a href="/" className="nav-brand">
            <span className="nav-brand-name">The Little Food Box</span>
            <span className="nav-brand-sub">Home kitchen · Made with love 🍱</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={activePage === label.toLowerCase().replace(" ", "") ? "active" : ""}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="nav-cta">
            Order Now
          </a>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-sub">The Little Food Box</div>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={activePage === label.toLowerCase().replace(" ", "") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="drawer-cta">
          Order on WhatsApp
        </a>
      </div>
    </>
  );
}