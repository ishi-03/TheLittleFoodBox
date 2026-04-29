import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,500&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream:      #fdf6ec;
    --warm:       #f5e9d4;
    --parchment:  #ede0c8;
    --terra:      #b5572a;
    --terra-dim:  rgba(181,87,42,0.11);
    --terra-glow: rgba(181,87,42,0.22);
    --espresso:   #2c1a0e;
    --brown:      #6b3f23;
    --muted:      #a08060;
    --leaf:       #5a7a52;
    --leaf-dim:   rgba(90,122,82,0.13);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--cream);
    font-family: 'Jost', sans-serif;
    color: var(--espresso);
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 100;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 24px 80px;
    position: relative;
    background:
      radial-gradient(ellipse 70% 55% at 50% 0%, rgba(181,87,42,0.09) 0%, transparent 70%),
      var(--cream);
    overflow: hidden;
  }

  .hero-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(181,87,42,0.07);
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .hero-ring-1 { width: 560px; height: 560px; animation: spin 44s linear infinite; }
  .hero-ring-2 { width: 820px; height: 820px; animation: spin 70s linear infinite reverse; }
  @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }

  .hero-eyebrow {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--terra);
    font-weight: 500;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.2s forwards;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow::before, .hero-eyebrow::after {
    content: '';
    width: 30px; height: 1px;
    background: var(--terra);
    opacity: 0.4;
  }

  .hero-emoji {
    font-size: 66px;
    display: block;
    margin: 18px 0 20px;
    opacity: 0;
    animation: popIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 8px 20px rgba(181,87,42,0.2));
  }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.6) rotate(-8deg); }
    to   { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(46px, 9vw, 80px);
    font-weight: 600;
    line-height: 1.06;
    color: var(--espresso);
    opacity: 0;
    animation: fadeUp 0.7s ease 0.5s forwards;
    position: relative;
    z-index: 1;
  }

  .hero-title em { font-style: italic; color: var(--terra); }

  .hero-sub {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 300;
    margin-top: 14px;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.65s forwards;
    position: relative;
    z-index: 1;
  }

  .hero-desc {
    max-width: 480px;
    font-size: 16px;
    line-height: 1.85;
    color: var(--brown);
    font-weight: 300;
    margin: 26px auto 0;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.8s forwards;
    position: relative;
    z-index: 1;
  }
  .hero-desc strong { font-weight: 600; color: var(--espresso); }

  .hero-badges {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 26px;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.95s forwards;
    position: relative;
    z-index: 1;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 24px;
    padding: 7px 15px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
  .badge-green { background: var(--leaf-dim); border: 1px solid rgba(90,122,82,0.25); color: var(--leaf); }
  .badge-terra { background: var(--terra-dim); border: 1px solid rgba(181,87,42,0.22); color: var(--terra); }
  .badge-warm  { background: var(--warm); border: 1px solid var(--parchment); color: var(--brown); }

  .live-dot {
    width: 7px; height: 7px;
    background: var(--leaf);
    border-radius: 50%;
    animation: blink 2.5s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .hero-cta-row {
    display: flex;
    gap: 12px;
    margin-top: 34px;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 0.6s ease 1.1s forwards;
    position: relative;
    z-index: 1;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: var(--espresso);
    color: var(--cream);
    border: none;
    border-radius: 12px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.3s;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--terra), #8b3a18);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px var(--terra-glow); }
  .btn-primary > * { position: relative; z-index: 1; }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: transparent;
    color: var(--espresso);
    border: 1.5px solid var(--parchment);
    border-radius: 12px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.25s, background 0.25s, transform 0.2s;
  }
  .btn-outline:hover { border-color: var(--terra); background: var(--terra-dim); transform: translateY(-2px); }

  .scroll-hint {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0;
    animation: fadeUp 0.5s ease 1.5s forwards;
    z-index: 1;
  }
  .scroll-hint span { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); font-weight: 500; }
  .scroll-arrow { width: 1px; height: 34px; background: linear-gradient(to bottom, var(--parchment), transparent); animation: scrollPulse 2s ease-in-out infinite; }
  @keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

  /* ── STATS STRIP ── */
  .stats-strip {
    background: var(--espresso);
    padding: 36px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
  }
  .strip-stat { flex: 1; min-width: 100px; max-width: 180px; text-align: center; padding: 8px 20px; }
  .strip-num { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 600; color: var(--terra); line-height: 1; }
  .strip-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: rgba(253,246,236,0.4); margin-top: 6px; font-weight: 500; }
  .strip-sep { width: 1px; height: 44px; background: rgba(255,255,255,0.07); }

  /* ── SHARED SECTION ── */
  .section { padding: 88px 24px; max-width: 1080px; margin: 0 auto; }

  .section-eyebrow {
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--terra);
    font-weight: 500;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-eyebrow::after { content: ''; flex: 1; max-width: 44px; height: 1px; background: var(--terra); opacity: 0.4; }
  .section-eyebrow.center { justify-content: center; }
  .section-eyebrow.center::after { display: none; }

  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 5vw, 50px); font-weight: 600; line-height: 1.15; color: var(--espresso); margin-bottom: 20px; }
  .section-title em { font-style: italic; color: var(--terra); }
  .section-title.center { text-align: center; }
  .section-title.light { color: var(--cream); }

  /* ── STORY ── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }

  .story-text { font-size: 15.5px; line-height: 1.9; color: var(--brown); font-weight: 300; }
  .story-text strong { font-weight: 600; color: var(--espresso); }
  .story-text p + p { margin-top: 18px; }

  .story-visual {
    aspect-ratio: 4/5;
    border-radius: 20px;
    background: linear-gradient(155deg, #f5e9d4 0%, #ede0c8 100%);
    border: 1.5px solid var(--parchment);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }
  .story-visual::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 30%, rgba(181,87,42,0.06), transparent 60%); }
  .visual-emoji { font-size: 70px; filter: drop-shadow(0 8px 20px rgba(181,87,42,0.15)); }
  .visual-caption { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-style: italic; color: var(--muted); text-align: center; padding: 0 24px; line-height: 1.6; }

  /* ── MENU ── */
  .menu-section { background: var(--warm); border-top: 1px solid var(--parchment); border-bottom: 1px solid var(--parchment); padding: 80px 24px; }
  .menu-inner { max-width: 1080px; margin: 0 auto; }

  .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 16px; margin-top: 40px; }

  .menu-card {
    background: #fffdf8;
    border: 1.5px solid var(--parchment);
    border-radius: 18px;
    padding: 28px 18px 24px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    cursor: default;
  }
  .menu-card:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(181,87,42,0.12); border-color: rgba(181,87,42,0.25); }
  .menu-card-emoji { font-size: 36px; display: block; margin-bottom: 12px; }
  .menu-card-title { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 600; color: var(--espresso); margin-bottom: 7px; }
  .menu-card-desc { font-size: 12px; color: var(--muted); line-height: 1.65; font-weight: 300; }

  /* ── VALUES ── */
  .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 44px; }
  .value-item { padding: 28px 22px; border-radius: 16px; border: 1.5px solid var(--parchment); background: #fffdf8; transition: border-color 0.3s, transform 0.3s; }
  .value-item:hover { border-color: rgba(181,87,42,0.2); transform: translateY(-4px); }
  .value-icon { font-size: 28px; margin-bottom: 13px; display: block; }
  .value-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--espresso); margin-bottom: 8px; }
  .value-text { font-size: 13px; color: var(--muted); line-height: 1.7; font-weight: 300; }

  /* ── TESTIMONIALS ── */
  .testimonials-section { background: var(--espresso); padding: 80px 24px; }
  .testimonials-inner { max-width: 900px; margin: 0 auto; text-align: center; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-top: 44px; text-align: left; }
  .testimonial-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 24px 22px; }
  .testimonial-stars { font-size: 13px; color: var(--terra); letter-spacing: 2px; margin-bottom: 12px; }
  .testimonial-text { font-family: 'Cormorant Garamond', serif; font-size: 16px; line-height: 1.75; color: rgba(253,246,236,0.7); font-style: italic; }
  .testimonial-author { margin-top: 14px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--terra); font-weight: 500; }

  /* ── ORDER ── */
  .order-section {
    padding: 100px 24px;
    text-align: center;
    background: radial-gradient(ellipse 60% 60% at 50% 100%, rgba(181,87,42,0.07), transparent), var(--cream);
  }

  .order-desc { max-width: 420px; margin: 14px auto 0; font-size: 15px; line-height: 1.8; color: var(--muted); font-weight: 300; }

  .order-options { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
  .order-option { background: #fffdf8; border: 1.5px solid var(--parchment); border-radius: 16px; padding: 24px 26px; min-width: 152px; text-align: center; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; cursor: pointer; }
  .order-option:hover { border-color: var(--terra); transform: translateY(-4px); box-shadow: 0 10px 32px var(--terra-glow); }
  .order-option-emoji { font-size: 30px; display: block; margin-bottom: 10px; }
  .order-option-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: var(--espresso); margin-bottom: 4px; }
  .order-option-sub { font-size: 11px; color: var(--muted); font-weight: 300; }

  .big-order-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 44px;
    padding: 17px 44px;
    background: var(--espresso);
    color: var(--cream);
    border: none;
    border-radius: 13px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.3s;
  }
  .big-order-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--terra), #8b3a18); opacity: 0; transition: opacity 0.3s; }
  .big-order-btn:hover::before { opacity: 1; }
  .big-order-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 36px var(--terra-glow); }
  .big-order-btn > * { position: relative; z-index: 1; }

  /* ── FOOTER ── */
  .site-footer { background: var(--espresso); border-top: 1px solid rgba(255,255,255,0.05); padding: 40px 24px; text-align: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 25px; font-weight: 600; color: var(--cream); display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 8px; }
  .footer-logo em { color: var(--terra); font-style: italic; }
  .footer-tagline { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(253,246,236,0.28); margin-bottom: 16px; }
  .footer-heart { color: var(--terra); animation: heartbeat 2s ease-in-out infinite; display: inline-block; }
  @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.3)} 28%{transform:scale(1)} 42%{transform:scale(1.15)} 56%{transform:scale(1)} }
  .footer-copy { font-size: 11px; color: rgba(253,246,236,0.22); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 700px) {
    .two-col { grid-template-columns: 1fr; gap: 36px; }
    .values-grid { grid-template-columns: 1fr; }
    .menu-grid { grid-template-columns: 1fr 1fr; }
    .strip-sep { display: none; }
    .hero-ring-1, .hero-ring-2 { display: none; }
  }
`;

const menuItems = [
  { emoji: "🧀", title: "Cream Cheese Dips", desc: "Signature dips across Indian, Italian, Mexican & Oriental — always a conversation starter" },
  { emoji: "🍽️", title: "Grazing Tables", desc: "Beautifully curated spreads for gatherings, parties & special occasions" },
  { emoji: "🍰", title: "Desserts", desc: "Indulgent sweets crafted from scratch — because life is better with dessert" },
  { emoji: "🚗", title: "Meals on Wheels", desc: "Fresh, home-cooked meals delivered right to your doorstep" },
  { emoji: "🥗", title: "Salad Subscription", desc: "Newly launched! Crisp, wholesome salads on a weekly plan — eat clean, effortlessly" },
  { emoji: "✨", title: "Custom Orders", desc: "Have something specific in mind? Parul makes it happen, just for you" },
];

const values = [
  { icon: "🏠", title: "Home-Made Always", text: "Every single item is made by Parul herself — no outsourcing, no factory shortcuts, ever." },
  { icon: "🌍", title: "Multi-Cuisine Mastery", text: "From smoky Indian spices to Italian herbs and Mexican heat — one kitchen, many worlds." },
  { icon: "💛", title: "Made for You", text: "Customised orders, personal preferences, dietary needs — The LFB bends the menu for its people." },
];

const testimonials = [
  { text: "The cream cheese dips are genuinely unlike anything I've had — I brought them to a party and people wouldn't stop asking where they were from.", author: "Ananya R., Party Host" },
  { text: "Parul's grazing table at my sister's baby shower was the highlight of the evening. Absolutely stunning and delicious.", author: "Meera T., Event Customer" },
  { text: "I subscribed to the salad plan last week and it's already changed how I eat. Fresh, flavourful, and delivered perfectly.", author: "Kabir S., Salad Subscriber" },
];

export default function About() {
  const [counts, setCounts] = useState({ orders: 0, dishes: 0, years: 0, happy: 0 });
  const targets = { orders: 500, dishes: 40, years: 3, happy: 200 };
const navigate = useNavigate();
  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({
        orders: Math.round(targets.orders * e),
        dishes: Math.round(targets.dishes * e),
        years:  Math.round(targets.years * e),
        happy:  Math.round(targets.happy * e),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{css}</style>
<button
  onClick={() => navigate(-1)}
  style={{
    position: "absolute",
    top: "90px",
    left: "24px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#6b3f23",
    zIndex: 20,
    transition: "color 0.2s"
  }}
  onMouseEnter={e => e.currentTarget.style.color = "#b5572a"}
  onMouseLeave={e => e.currentTarget.style.color = "#6b3f23"}
>
  ←
</button>
      {/* HERO */}
      <section className="hero">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-eyebrow">Home · Kitchen · Heart</div>
        <span className="hero-emoji">🍱</span>
        <h1 className="hero-title">The <em>Little</em><br />Food Box</h1>
        <p className="hero-sub">Home · Crafted · Daily · With Love</p>
        <p className="hero-desc">
          Real food made in a real home. Every box carries{" "}
          <strong>recipes passed down through generations</strong> — packed with
          honest ingredients and zero compromises.
        </p>
        <div className="hero-badges">
          <span className="badge badge-green"><span className="live-dot" /> Freshly Made Today</span>
          <span className="badge badge-terra">🌿 No Preservatives</span>
          <span className="badge badge-warm">🏠 Home Kitchen</span>
        </div>
        <div className="hero-cta-row">
   <a 
  href="https://wa.me/918236055718?text=Hi%20I%20want%20to%20order%20from%20The%20LFB" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <button className="btn-primary">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
    <span>Order Now</span>
  </button>
</a>
<Link to="/menu">
  <button className="btn-outline">See the Menu</button>
</Link>        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        {[
          { num: `${counts.orders}+`, label: "Orders Delivered" },
          { num: `${counts.dishes}+`, label: "Dishes on Menu" },
          { num: `${counts.happy}+`, label: "Happy Families" },
          { num: `${counts.years}yr`, label: "Years Running" },
        ].map(({ num, label }, i) => (
          <>
            {i > 0 && <div className="strip-sep" key={`sep-${i}`} />}
            <div className="strip-stat" key={label}>
              <div className="strip-num">{num}</div>
              <div className="strip-label">{label}</div>
            </div>
          </>
        ))}
      </div>

      {/* STORY */}
      <section className="section">
        <div className="two-col">
          <div>
            <div className="section-eyebrow">Our Story</div>
            <h2 className="section-title">Cooked with <em>love</em>,<br />served with soul</h2>
            <div className="story-text">
              <p>It started with a simple idea — <strong>what if everyone could eat the way we eat at home?</strong> No fancy restaurant, no factory packet. Just a warm meal, made fresh, with ingredients you can trust.</p>
              <p>The Little Food Box was born right here in our kitchen. Every morning begins with grinding fresh masalas, rolling dough by hand, and simmering dals the way our grandmothers taught us — <strong>low heat, lots of patience, and no shortcuts.</strong></p>
              <p>We believe good food is an act of love. And every box we pack is proof of that.</p>
            </div>
          </div>
          <div className="story-visual">
            <span className="visual-emoji">👩‍🍳</span>
            <p className="visual-caption">"Every morning I cook as if my own family is coming for lunch."</p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu-section">
        <div className="menu-inner">
          <div className="section-eyebrow">What We Make</div>
          <h2 className="section-title">Fresh from our <em>kitchen</em></h2>
          <div className="menu-grid">
            {menuItems.map(({ emoji, title, desc }) => (
              <div className="menu-card" key={title}>
                <span className="menu-card-emoji">{emoji}</span>
                <div className="menu-card-title">{title}</div>
                <div className="menu-card-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="section-eyebrow">Why Us</div>
        <h2 className="section-title">The <em>promise</em> in every box</h2>
        <div className="values-grid">
          {values.map(({ icon, title, text }) => (
            <div className="value-item" key={title}>
              <span className="value-icon">{icon}</span>
              <div className="value-title">{title}</div>
              <div className="value-text">{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <div className="section-eyebrow center">What People Say</div>
          <h2 className="section-title center light">Straight from the <em>heart</em></h2>
          <div className="testimonials-grid">
            {testimonials.map(({ text, author }) => (
              <div className="testimonial-card" key={author}>
                <div className="testimonial-stars">★★★★★</div>
                <div className="testimonial-text">"{text}"</div>
                <div className="testimonial-author">— {author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section className="order-section">
        <div className="section-eyebrow center">Get Started</div>
        <h2 className="section-title center">Ready to eat <em>well?</em></h2>
        <p className="order-desc">Choose how you'd like your food — daily tiffin, weekly meal plan, or a one-time order for the family.</p>
        <div className="order-options">
          {[
            { emoji: "🌅", title: "Daily Tiffin",    sub: "Lunch & Dinner, everyday" },
            { emoji: "📅", title: "Weekly Plan",     sub: "Subscribe & save more" },
            { emoji: "🎉", title: "One-time Order",  sub: "For occasions & get-togethers" },
          ].map(({ emoji, title, sub }) => (
            <div className="order-option" key={title}>
              <span className="order-option-emoji">{emoji}</span>
              <div className="order-option-title">{title}</div>
              <div className="order-option-sub">{sub}</div>
            </div>
          ))}
        </div>
        <button className="big-order-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span>Place Your Order</span>
        </button>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-logo">🍱 The <em>Little</em> Food Box</div>
        <div className="footer-tagline">Home · Crafted · Daily</div>
        <div className="footer-copy">Made with <span className="footer-heart">♥</span> from our home kitchen · {new Date().getFullYear()}</div>
      </footer>
    </>
  );
}