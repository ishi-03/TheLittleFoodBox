import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   NAVIGATION DATA
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { name: "Home", to: "/", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
  { name: "About", to: "/about", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061" },
  { name: "Menu", to: "/menu", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "Subscription", to: "/subscription", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
  { name: "Contact", to: "/contact", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061" }
];


/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Poppins:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; }

/* ═══════════════════════════════════════════
   DARK BASE — ensures text is always visible
   even before images load
═══════════════════════════════════════════ */
html, body, #root {
  background: #0a0a0a !important;
  min-height: 100vh;
}

/* Solid dark canvas sits below everything */
.ntb-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: #0d0d0d;
}

/* ═══════════════════════════════════════════
   BG IMAGES — dimmed to 30% opacity
═══════════════════════════════════════════ */
.ntb-images {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.55;
}

.ntb-images-track {
  display: flex;
  height: 100%;
  width: 300vw;
  animation: flowImages 24s linear infinite;
  will-change: transform;
}

.ntb-images-track img {
  width: 50vw;
  height: 100vh;
  object-fit: cover;
  flex-shrink: 0;
}

@keyframes flowImages {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ═══════════════════════════════════════════
   RICH BG TEXTURE / GRAIN OVERLAY
═══════════════════════════════════════════ */
.ntb-grain {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

/* ═══════════════════════════════════════════
   HERO TRIGGER  .ntb-hero
   Centre-screen editorial heading + subtitle CTA
═══════════════════════════════════════════ */
.ntb-hero {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  text-align: center;
  pointer-events: auto;
  user-select: none;
  width: 90vw;
  max-width: 700px;
}

/* Thin decorative rule above title */
.ntb-hero-rule {
  display: block;
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  margin: 0 auto 22px;
  animation: ruleReveal 1.4s cubic-bezier(.22,1,.36,1) both;
}

@keyframes ruleReveal {
  from { width: 0; opacity: 0; }
  to   { width: 60px; opacity: 1; }
}

/* Main brand title */
.ntb-hero-title {
  font-family: 'Cinzel', serif;
 font-size: clamp(18pt, 3.5vw, 28pt);
  font-weight: 400;
  letter-spacing: 0.22em;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 10px;
  line-height: 1.1;
  text-shadow: 0 2px 40px rgba(0,0,0,0.5);
  animation: titleReveal 1.4s cubic-bezier(.22,1,.36,1) .1s both;
}

@keyframes titleReveal {
  from { opacity: 0; transform: translateY(12px); letter-spacing: 0.38em; }
  to   { opacity: 1; transform: translateY(0);    letter-spacing: 0.22em; }
}

/* Italic serif sub-rule */
.ntb-hero-sub-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 20px;
  animation: fadeUp 1.4s cubic-bezier(.22,1,.36,1) .25s both;
}

.ntb-hero-sub-rule span {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(9pt, 1.5vw, 11pt);
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ntb-hero-sub-rule::before,
.ntb-hero-sub-rule::after {
  content: '';
  width: 32px;
  height: 1px;
  background: rgba(255,255,255,0.3);
}

/* CTA — pill border button */
.ntb-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Cinzel', serif;
  font-size: clamp(8pt, 1.2vw, 10pt);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 16px 40px;
  position: relative;
  overflow: hidden;
  transition: border-color .4s ease, transform .15s ease;
  animation: fadeUp 1.4s cubic-bezier(.22,1,.36,1) .4s both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Shimmer fill on hover */
.ntb-hero-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.08);
  transform: translateX(-101%);
  transition: transform .45s cubic-bezier(.22,1,.36,1);
}
.ntb-hero-cta::after { display: none; }

.ntb-hero-cta:hover { border-color: rgba(255,255,255,0.85); }
.ntb-hero-cta:hover::before { transform: translateX(0); }
.ntb-hero-cta:active { transform: scale(.97); }

/* Arrow */
.ntb-hero-cta .ntb-arrow {
  display: inline-block;
  font-style: normal;
  font-size: 1em;
  opacity: 0.55;
  transition: transform .4s ease, opacity .3s ease;
}
.ntb-hero-cta:hover .ntb-arrow {
  transform: translateY(3px);
  opacity: 1;
}

/* Hide hero while menu opens */
.ntb-hero.spinning { pointer-events: none; }
.ntb-hero.hidden   { opacity: 0; pointer-events: none; transition: opacity .3s ease; }

/* ═══════════════════════════════════════════
   CLOSE BUTTON
═══════════════════════════════════════════ */
.ntb-close {
  position: fixed;
  top: 28px;
  left: 32px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;
}

.ntb-close-icon { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; }
.ntb-close-icon svg { fill: #fff; width: 100%; height: auto; }

.ntb-close-label {
  font-family: 'Poppins', sans-serif;
  font-size: 9pt;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  transition: color .3s ease;
}

.ntb-close:hover .ntb-close-label { color: #fff; }

.ntb-close.visible {
  opacity: 1;
  pointer-events: auto;
  transition: opacity .3s ease 1.8s;
}

/* ═══════════════════════════════════════════
   GRADIENT OVERLAY SWEEP
═══════════════════════════════════════════ */
.ntb-overlay {
  background: linear-gradient(
    120deg,
    rgba(0,0,0,0.6),
    rgba(0,0,0,0.4),
    rgba(0,0,0,0.6)
  );
}

.ntb-overlay.sweeping {
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
  transition: clip-path 1s ease-in-out .3s;
  pointer-events: auto;
}

.ntb-overlay.closing {
  clip-path: polygon(0% 100%, 35% 100%, 65% 100%, 100% 100%);
  transition: clip-path .6s ease-in-out .4s;
}

/* ═══════════════════════════════════════════
   COLUMNS
═══════════════════════════════════════════ */
.ntb-cols {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  pointer-events: none;
}
.ntb-cols.open { pointer-events: auto; }

.ntb-col {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  overflow: hidden;
  z-index: 5;
  bottom: -100%;
  transition: none;
}

.ntb-col:nth-child(1) { left: 0;   }
.ntb-col:nth-child(2) { left: 20%; }
.ntb-col:nth-child(3) { left: 40%; }
.ntb-col:nth-child(4) { left: 60%; }
.ntb-col:nth-child(5) { left: 80%; }
.ntb-cols.open .ntb-col:nth-child(1) { bottom: 0; transition: bottom .6s ease .2s; }
.ntb-cols.open .ntb-col:nth-child(2) { bottom: 0; transition: bottom .6s ease .5s; }
.ntb-cols.open .ntb-col:nth-child(3) { bottom: 0; transition: bottom .6s ease .8s; }
.ntb-cols.open .ntb-col:nth-child(4) { bottom: 0; transition: bottom .6s ease 1.1s; }
.ntb-cols.open .ntb-col:nth-child(5) { bottom: 0; transition: bottom .6s ease 1.4s; }
.ntb-col::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35); /* ONLY this */
  z-index: 0;
}
  .ntb-col:hover::before {
  background: rgba(0,0,0,0.3);
}


.ntb-col::after {
  content: "";
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 0.8s ease;
  z-index: -1;
}

.ntb-col {
  transition: transform 0.6s ease;
}

.ntb-col:hover {
  transform: scale(1.05);
}
  .ntb-col-anchor:hover {
  transform: translateY(-4px);
  background: rgba(0,0,0,0.5);
}
/* Column link */
.ntb-col-anchor {
  position: relative;
  z-index: 1;
  color: #fff;
  text-decoration: none;
  font-family: 'Cinzel', serif;
font-size: 16px;
  padding: 14px 18px;
  width: 90%;
  text-align: center;
/* font-size: clamp(14px, 1.8vw, 20px); */
  letter-spacing: 0.18em;

  backdrop-filter: blur(10px);
  background: rgba(0,0,0,0.35);

  border-radius: 10px;

  transition: all 0.3s ease;
}
.ntb-col-anchor:active { transform: scale(.94); }

.ntb-col-anchor::after {
  content: '';
  display: block;
  position: absolute;
  left: 0; bottom: 0;
  height: 0; width: 100%;
  z-index: -1;
  background: rgba(0,0,0,0.85);
  transition: height .4s cubic-bezier(.215,.61,.355,1);
}
.ntb-col:hover .ntb-col-anchor::after { height: 100%; bottom: auto; top: 0; }
.ntb-col:hover .ntb-col-anchor { color: #fff; }

.ntb-col-anchor.active {
  color: rgba(255,255,255,0.95);
  text-shadow: 0 0 20px rgba(255,255,255,.3);
}

/* ═══════════════════════════════════════════
   DARK BACKDROP — sits above images, below hero text
   Always slightly visible so text pops
═══════════════════════════════════════════ */
.ntb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 3;
  background: #000;
  pointer-events: none;
  opacity: 0.55;
  transition: opacity .4s ease;
}
.ntb-backdrop.visible {
  opacity: 0.5;
  pointer-events: auto;
}

/* ═══════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════ */
@media (max-width: 890px) {
  .ntb-col-anchor { font-size: 12pt; padding: 12px 14px; }
}
@media (max-width: 600px) {

  /* Layout */
  .ntb-cols {
    flex-direction: column;
    overflow: hidden;
  }

  /* Initial state (hidden below screen) */
  .ntb-col {
    display: flex;
    position: relative !important;
    left: auto !important;
    width: 100% !important;
    height: 20vh !important;
    min-height: 80px;

    transform: translateY(100%);
    opacity: 0;

    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                opacity 0.6s ease;
  }

  /* Animate in */
  .ntb-cols.open .ntb-col {
    transform: translateY(0);
    opacity: 1;
  }

  /* Smooth stagger */
  .ntb-cols.open .ntb-col:nth-child(1) { transition-delay: 0.1s; }
  .ntb-cols.open .ntb-col:nth-child(2) { transition-delay: 0.2s; }
  .ntb-cols.open .ntb-col:nth-child(3) { transition-delay: 0.3s; }
  .ntb-cols.open .ntb-col:nth-child(4) { transition-delay: 0.4s; }
  .ntb-cols.open .ntb-col:nth-child(5) { transition-delay: 0.5s; }

  /* Disable hover (mobile) */
  .ntb-col:hover {
    transform: none;
  }

  /* Button styling */
  .ntb-col-anchor {
    font-size: 13pt;
    padding: 12px 18px;
    width: 80%;
  }

  /* Close button */
  .ntb-close {
    top: 16px;
    left: 16px;
  }

  /* Hero text */
  .ntb-hero-title {
    font-size: clamp(16pt, 6vw, 22pt);
  }

}`;
const T_SPIN_HIDE = 150;
export default function Navbar() {
  const [phase, setPhase] = useState("idle");
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  const navigate  = useNavigate();
  const styleRef  = useRef(null);
  const timers    = useRef([]);

  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  /* Inject styles once */
  useEffect(() => {
    if (!document.getElementById("ntb-styles")) {
      const tag = document.createElement("style");
      tag.id = "ntb-styles";
      tag.textContent = STYLES;
      document.head.appendChild(tag);
      styleRef.current = tag;
    }
    return () => styleRef.current?.remove();
  }, []);

  /* Sync user from localStorage */
  useEffect(() => {
    const onStorage = () => {
      try { setUser(JSON.parse(localStorage.getItem("user"))); } catch { setUser(null); }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow =
      phase === "open" || phase === "spinning" ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const openMenu = () => {
    if (phase !== "idle") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("spinning");
    addTimer(() => setPhase("open"), T_SPIN_HIDE);
  };

  const closeMenu = () => {
    if (phase === "idle" || phase === "closing") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("closing");
    addTimer(() => setPhase("idle"), 900);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    closeMenu();
    navigate("/login");
  };

  const isIdle     = phase === "idle";
  const isSpinning = phase === "spinning";
  const isOpen     = phase === "open";
  const isClosing  = phase === "closing";
  const anyVisible = !isIdle;

  const authSlot = user
    ? { name: "Logout", to: null,     isLogout: true  }
    : { name: "Login",  to: "/login", isLogout: false };

  const columns = NAV_LINKS;

  return (
    <>
      {/* ── Solid dark canvas base ── */}
      <div className="ntb-canvas" />

      {/* ── Flowing image background ── */}
      <div className="ntb-images">
        <div className="ntb-images-track">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" alt="" />
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80" alt="" />
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80" alt="" />
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" alt="" />
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80" alt="" />
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80" alt="" />
        </div>
      </div>

      {/* ── Grain overlay ── */}
      <div className="ntb-grain" />

      {/* ── Dark backdrop — always on to ensure text contrast ── */}
      <div className={`ntb-backdrop${anyVisible ? " visible" : ""}`} />

      {/* ── Gradient overlay sweep ── */}
      <div
        className={[
          "ntb-overlay",
          (isSpinning || isOpen) ? "sweeping" : "",
          isClosing              ? "closing"  : "",
        ].join(" ").trim()}
      />

      {/* ── Five animated columns ── */}
      <div className={`ntb-cols${isOpen ? " open" : ""}`}>
        {columns.map((col, i) => (
          <ColItem
            key={col.name}
            col={col}
            isMenuOpen={isOpen}
            onClose={closeMenu}
            onLogout={handleLogout}
          />
        ))}
      </div>

      {/* ── Close button ── */}
      <button
        className={`ntb-close${isOpen ? " visible" : ""}`}
        onClick={closeMenu}
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
      >
        <span className="ntb-close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fillRule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
            <path fillRule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
          </svg>
        </span>
        <span className="ntb-close-label">Close</span>
      </button>

      {/* ── Editorial hero trigger (replaces hamburger) ── */}
      <div
        className={[
          "ntb-hero",
          isSpinning            ? "spinning" : "",
          (isOpen || isClosing) ? "hidden"   : "",
        ].join(" ").trim()}
      >
        <span className="ntb-hero-rule" />

        <h1 className="ntb-hero-title">The Little Food Box</h1>

        <div className="ntb-hero-sub-rule">
          <span>Curated · Crafted · Delivered</span>
        </div>

        <button
          className="ntb-hero-cta"
          onClick={openMenu}
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          Explore Menu
          <span className="ntb-arrow">↓</span>
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   COLUMN ITEM
───────────────────────────────────────────────────────────── */
function ColItem({ col, color, isMenuOpen, onClose, onLogout }) {
  const { pathname } = useLocation();
  const isActive = col.to && pathname === col.to;

  return (
<div
  className="ntb-col"
  style={{
  backgroundImage: col.img 
    ? `url(${col.img})`
    : "linear-gradient(135deg, #111, #222)", // fallback
  backgroundSize: "cover",
  backgroundPosition: "center"
}}
>      {col.isLogout ? (
        <button
          className="ntb-col-anchor"
          onClick={onLogout}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          Logout
        </button>
      ) : (
        <Link
          to={col.to}
          className={`ntb-col-anchor${isActive ? " active" : ""}`}
          onClick={onClose}
          tabIndex={isMenuOpen ? 0 : -1}
          title={col.name}
          rel="noopener"
        >
          {col.name}
        </Link>
      )}
    </div>
  );
}