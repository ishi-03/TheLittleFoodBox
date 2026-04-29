import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Subscription", href: "/subscription" },
  { label: "My Subscription", href: "/my-subscription" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

/**
 * Props:
 *  activePage  — string matching href slug e.g. "menu", "mysubscription"
 *  user        — null | { name: string, avatar?: string }
 *  onLogin     — () => void
 *  onRegister  — () => void
 *  onLogout    — () => void
 */
export default function Nav({
  activePage = "",
  user = null,
  onLogin,
  onRegister,
  onLogout,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href) =>
    activePage === href.replace("/", "").replace(/-/g, "");

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Nav root ── */
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
          padding: 1.35rem 3rem;
        }
        .nav-root.at-top { background: transparent; box-shadow: none; }
        .nav-root.scrolled {
          background: #fffdf9;
          box-shadow: 0 1px 0 #e0d5c5, 0 4px 24px rgba(42,26,14,0.07);
          padding: 0.8rem 3rem;
        }

        /* ── Inner ── */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          gap: 1.25rem;
        }

        /* ── Brand ── */
        .nav-brand {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1;
          flex-shrink: 0;
        }
        .nav-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #2a1a0e;
          line-height: 1.1;
          white-space: nowrap;
        }
        .nav-brand-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          color: #9a7d65;
          margin-top: 2px;
          white-space: nowrap;
        }

        /* ── Desktop links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          list-style: none;
          margin: 0; padding: 0;
          flex: 1;
          justify-content: center;
        }
        .nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #6b5440;
          font-weight: 500;
          position: relative;
          padding: 4px 9px;
          border-radius: 2px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 9px; right: 9px;
          height: 1.5px;
          background: #b5451b;
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }
        .nav-links a:hover { color: #b5451b; }
        .nav-links a:hover::after { transform: scaleX(1); }
        .nav-links a.active { color: #b5451b; font-weight: 600; }
        .nav-links a.active::after { transform: scaleX(1); }

        /* Subscription pill */
        .nav-links a.pill {
          background: #fdf3ec;
          color: #b5451b;
          font-weight: 600;
          border: 1px solid #f0cdb8;
        }
        .nav-links a.pill::after { display: none; }
        .nav-links a.pill:hover { background: #b5451b; color: #fff; border-color: #b5451b; }

        /* ── Auth area ── */
        .nav-auth {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .btn-login {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 3px;
          border: 1px solid #c9b49a;
          color: #6b5440;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .btn-login:hover { border-color: #b5451b; color: #b5451b; }

        .btn-register {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 3px;
          border: none;
          background: #2a1a0e;
          color: #f5f0e8;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .btn-register:hover { background: #b5451b; transform: translateY(-1px); }
        .btn-register:active { transform: translateY(0); }

        /* Order CTA (shown when logged in) */
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 600;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 3px;
          background: #2a1a0e;
          color: #f5f0e8;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .nav-cta:hover { background: #b5451b; transform: translateY(-1px); }
        .nav-cta:active { transform: translateY(0); }

        /* ── Avatar dropdown ── */
        .nav-avatar-wrap { position: relative; }

        .nav-avatar-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 3px 6px 3px 3px;
          border-radius: 50px;
          border: 1px solid #e8ddd1;
          background: #fffdf9;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nav-avatar-btn:hover {
          border-color: #c9b49a;
          box-shadow: 0 2px 8px rgba(42,26,14,0.08);
        }

        .avatar-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #2a1a0e;
          color: #f5f0e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }

        .avatar-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 500;
          color: #2a1a0e;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .avatar-caret { transition: transform 0.25s; }
        .avatar-caret.open { transform: rotate(180deg); }

        /* Dropdown panel */
        .avatar-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 188px;
          background: #fffdf9;
          border: 1px solid #e8ddd1;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(42,26,14,0.13);
          overflow: hidden;
          opacity: 0;
          transform: translateY(-8px) scale(0.97);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
          transform-origin: top right;
        }
        .avatar-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .avatar-dropdown-header {
          padding: 13px 16px 11px;
          border-bottom: 1px solid #f0e8dc;
          background: linear-gradient(135deg, #fdf8f3 0%, #fffdf9 100%);
        }
        .avatar-dropdown-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #2a1a0e;
          line-height: 1;
        }
        .avatar-dropdown-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: #b5451b;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .avatar-dropdown a,
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          color: #4a3728;
          text-decoration: none;
          padding: 10px 16px;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .avatar-dropdown a:hover,
        .dropdown-item:hover { background: #fdf3ec; color: #b5451b; }

        .logout-item {
          border-top: 1px solid #f0e8dc;
          color: #8b3a1f !important;
        }
        .logout-item:hover { background: #fff5f2 !important; }

        .drop-icon { font-size: 13px; width: 16px; text-align: center; flex-shrink: 0; }

        /* ── Hamburger ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
          z-index: 1100;
          position: relative;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #2a1a0e;
          transition: transform 0.28s ease, opacity 0.28s ease;
          transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .nav-drawer {
          position: fixed;
          inset: 0;
          background: #fffdf9;
          z-index: 1050;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateX(100%);
          transition: transform 0.42s cubic-bezier(0.77, 0, 0.18, 1);
          padding: 2rem;
          overflow-y: auto;
          gap: 0;
        }
        .nav-drawer.open { transform: translateX(0); }

        .drawer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #9a7d65;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .drawer-user {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
        }
        .drawer-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #2a1a0e;
          color: #f5f0e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #e0d5c5;
          overflow: hidden;
        }
        .drawer-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .drawer-user-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #2a1a0e;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 300px;
        }
        .drawer-links a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.1rem;
          font-weight: 700;
          color: #2a1a0e;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: -0.01em;
          line-height: 1.2;
          padding: 0.22rem 0;
          width: 100%;
          text-align: center;
          border-bottom: 1px solid #f0e8dc;
        }
        .drawer-links a:last-child { border-bottom: none; }
        .drawer-links a:hover, .drawer-links a.active { color: #b5451b; }

        .drawer-divider {
          width: 40px; height: 1px;
          background: #e0d5c5;
          margin: 1.5rem 0;
        }

        .drawer-auth {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          width: 100%;
          max-width: 260px;
        }
        .drawer-auth .btn-register,
        .drawer-auth .btn-login {
          width: 100%;
          text-align: center;
          font-size: 11px;
          padding: 13px 20px;
        }

        .drawer-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 13px 36px;
          background: #2a1a0e;
          color: #f5f0e8;
          border-radius: 3px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .drawer-cta:hover { background: #b5451b; }

        .drawer-logout {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          color: #8b3a1f;
          background: none;
          border: 1px solid #f0cdb8;
          border-radius: 3px;
          padding: 11px 32px;
          cursor: pointer;
          margin-top: 0.7rem;
          transition: background 0.2s, color 0.2s;
        }
        .drawer-logout:hover { background: #fff5f2; color: #b5451b; }

        .nav-offset { height: 72px; }

        @media (max-width: 900px) {
          .nav-root { padding: 1rem 1.5rem; }
          .nav-root.scrolled { padding: 0.75rem 1.5rem; }
          .nav-links, .nav-auth { display: none !important; }
          .nav-hamburger { display: flex; }
          .nav-offset { height: 60px; }
        }

        @media (max-width: 1080px) and (min-width: 901px) {
          .nav-links { gap: 0; }
          .nav-links a { padding: 4px 6px; font-size: 9.5px; }
          .btn-login, .btn-register, .nav-cta { padding: 7px 12px; font-size: 9.5px; }
        }
      `}</style>

      <div className="nav-offset" />

      {/* ── Navbar ── */}
      <nav className={`nav-root ${scrolled ? "scrolled" : "at-top"}`}>
        <div className="nav-inner">

          {/* Brand */}
          <a href="/" className="nav-brand">
            <span className="nav-brand-name">The Little Food Box</span>
            <span className="nav-brand-sub">Home kitchen · Made with love 🍱</span>
          </a>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={[
  isActive(href) ? "active pill" : "",
].filter(Boolean).join(" ")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className="nav-auth">
            {user ? (
              <>
                <a
                  href="https://wa.me/918236055718"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-cta"
                >
                  Order Now
                </a>

                {/* Avatar + dropdown */}
                <div className="nav-avatar-wrap" ref={avatarRef}>
                  <button
                    className="nav-avatar-btn"
                    onClick={() => setAvatarOpen((v) => !v)}
                    aria-label="Account menu"
                  >
                    <div className="avatar-circle">
                      {user.avatar ? <img src={user.avatar} alt={user.name} /> : initials}
                    </div>
                    <span className="avatar-name">{user.name.split(" ")[0]}</span>
                    <svg
                      className={`avatar-caret ${avatarOpen ? "open" : ""}`}
                      width="10" height="6" viewBox="0 0 10 6" fill="none"
                    >
                      <path d="M1 1l4 4 4-4" stroke="#9a7d65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <div className={`avatar-dropdown ${avatarOpen ? "open" : ""}`}>
                    <div className="avatar-dropdown-header">
                      <div className="avatar-dropdown-name">{user.name}</div>
                      <div className="avatar-dropdown-label">✦ Member</div>
                    </div>
                    <a href="/my-subscription" onClick={() => setAvatarOpen(false)}>
                      <span className="drop-icon">📦</span> My Subscription
                    </a>
                    <a href="/profile" onClick={() => setAvatarOpen(false)}>
                      <span className="drop-icon">👤</span> Profile
                    </a>
                    <button
                      className="dropdown-item logout-item"
                      onClick={() => { setAvatarOpen(false); onLogout?.(); }}
                    >
                      <span className="drop-icon">🚪</span> Log Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="btn-login" onClick={() => onLogin?.()}>Log In</button>
                <button className="btn-register" onClick={() => onRegister?.()}>Register</button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-brand">The Little Food Box 🍱</div>

        {user && (
          <div className="drawer-user">
            <div className="drawer-avatar">
              {user.avatar ? <img src={user.avatar} alt={user.name} /> : initials}
            </div>
            <div className="drawer-user-name">Hello, {user.name.split(" ")[0]} 👋</div>
          </div>
        )}

        <div className="drawer-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={isActive(href) ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="drawer-divider" />

        {user ? (
          <>
            <a
              href="https://wa.me/918236055718"
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-cta"
              onClick={() => setMenuOpen(false)}
            >
              Order on WhatsApp
            </a>
            <button
              className="drawer-logout"
              onClick={() => { setMenuOpen(false); onLogout?.(); }}
            >
              🚪 Log Out
            </button>
          </>
        ) : (
          <div className="drawer-auth">
            <button
              className="btn-register"
              onClick={() => { setMenuOpen(false); onRegister?.(); }}
            >
              Create Account
            </button>
            <button
              className="btn-login"
              onClick={() => { setMenuOpen(false); onLogin?.(); }}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </>
  );
}