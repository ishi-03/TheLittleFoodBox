import { useState, useEffect, useRef } from "react";
import axios from "axios";

// ── MODULE-LEVEL CACHE ──
// Persists across component mounts (e.g. navigating away from MENU and back)
// so we don't refetch + reshow a 2-3s loading state every single time.
let menuCache = null;        // grouped menu array, once fetched successfully
let menuFetchPromise = null; // in-flight request, shared if multiple mounts race

// ── FILTERS: unchanged from original ──
const FILTERS = [
  { id: "all",       label: "All",           icon: "✦",  match: () => true },
  { id: "chefpick",  label: "Mum's Fave",    icon: "❤️", match: (d) => d.chefPick },
  { id: "popular",   label: "Fan Favourite", icon: "🔥", match: (d) => d.popular },
  { id: "spicy",     label: "Spicy",         icon: "🌶️", match: (d) => d.spicy },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; background: #f7f3ed; }

  :root {
    --bg: #f7f3ed;
    --surface: #fdfaf6;
    --border: rgba(0,0,0,0.07);
    --text-primary: #1a1209;
    --text-secondary: #7a6a52;
    --text-muted: #b8aa95;
    --radius: 12px;
    --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
  }

  /* noise texture */
  .noise::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 180px; opacity: 0.028;
  }

  .scroll { overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.08) transparent; }
  .scroll::-webkit-scrollbar { width: 3px; }
  .scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 99px; }

  @keyframes fadeUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse   { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
  @keyframes slideUp { from { opacity:0; transform:translateY(100%); } to { opacity:1; transform:translateY(0); } }

  /* sidebar nav */
  .nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 8px; cursor: pointer;
    border: none; background: transparent; width: 100%;
    text-align: left; transition: background 0.18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .nav-link:hover { background: rgba(0,0,0,0.04); }
  .nav-link.active { background: var(--accent-bg, rgba(196,125,42,0.08)); }

  /* filter tabs */
  .filter-tab {
    padding: 8px 0; cursor: pointer; border: none; background: transparent;
    font-family: var(--font-body); font-size: 13px; font-weight: 500;
    color: var(--text-muted); position: relative;
    transition: color 0.2s ease; white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .filter-tab::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
    height: 1.5px; background: var(--tab-accent, #c47d2a);
    transform: scaleX(0); transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
    border-radius: 99px;
  }
  .filter-tab.active { color: var(--text-primary); font-weight: 600; }
  .filter-tab.active::after { transform: scaleX(1); }
  .filter-tab:hover:not(.active) { color: var(--text-secondary); }

  /* dish row — tall, image inline */
  .dish-row {
    display: flex; align-items: center; gap: 20px;
    padding: 20px 12px; border-radius: 12px; margin: 0 -12px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s ease;
    cursor: default; min-height: 110px;
  }
  .dish-row:last-child { border-bottom: none; }
  @media (hover: hover) { .dish-row:hover { background: rgba(0,0,0,0.025); } }

  /* dish thumbnail */
  .dish-thumb {
    width: 96px; height: 96px; border-radius: 10px;
    overflow: hidden; flex-shrink: 0; position: relative;
    background: rgba(0,0,0,0.06);
  }
  .dish-thumb img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  @media (hover: hover) { .dish-row:hover .dish-thumb img { transform: scale(1.07); } }

  /* mobile bottom tab */
  .mobile-tab {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    flex: 1; padding: 8px 4px 6px; border: none; background: transparent;
    cursor: pointer; transition: transform 0.2s cubic-bezier(0.16,1,0.3,1);
    -webkit-tap-highlight-color: transparent;
  }
  .mobile-tab.active { animation: tabPop 0.35s cubic-bezier(0.16,1,0.3,1); }
  .mobile-tab-dot {
    width: 28px; height: 28px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .mobile-tab.active .mobile-tab-dot { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

  /* mobile order sheet */
  .order-sheet { position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column; justify-content: flex-end; }
  .order-sheet-backdrop { position: absolute; inset: 0; background: rgba(30,15,5,0.45); backdrop-filter: blur(4px); animation: fadeIn 0.25s ease both; }
  .order-sheet-panel { position: relative; z-index: 1; background: #fff9f0; border-radius: 24px 24px 0 0; padding: 20px 22px 36px; border-top: 1px solid var(--border); animation: slideUp 0.42s cubic-bezier(0.16,1,0.3,1) both; }
  .order-sheet-handle { width: 40px; height: 4px; border-radius: 99px; background: rgba(160,120,60,0.2); margin: 0 auto 18px; }

  .pulse { animation: pulse 2.5s ease-in-out infinite; }
  .anim-fade-up { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }

  @media (max-width: 767px) { .desktop-only { display: none !important; } }
  @media (min-width: 768px) { .mobile-only  { display: none !important; } }
`;

// ── Badge styles: premium pill design ──
const BADGE_BASE = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontFamily: "var(--font-body)",
  whiteSpace: "nowrap",
};

const BADGE_VARIANTS = {
  chefPick: { background: "#FDE8ED", color: "#C2185B", border: "1px solid #F8C6D3" },
  popular:  { background: "#FFF3D6", color: "#8A6D0B", border: "1px solid #F5E3A8" },
  jain:     { background: "#EAF8E6", color: "#2E7D32", border: "1px solid #C8E6C9" },
  vegan:    { background: "#E6F7EF", color: "#1B7A4D", border: "1px solid #BFE9D4" },
  spicy:    { background: "#FDEAEA", color: "#B3261E", border: "1px solid #F5C6C6" },
};

// ── DishBadges: renders premium pills, only if any flag is true ──
function DishBadges({ dish, style }) {
  const badges = [];
  if (dish.chefPick) badges.push({ key: "chefPick", icon: "❤️", label: "Mum's Fave", variant: BADGE_VARIANTS.chefPick });
  if (dish.popular)  badges.push({ key: "popular",  icon: "⭐", label: "Fan Favourite", variant: BADGE_VARIANTS.popular });
  if (dish.jain)     badges.push({ key: "jain",     icon: "🌱", label: "Jain", variant: BADGE_VARIANTS.jain });
  if (dish.vegan)    badges.push({ key: "vegan",    icon: "🥬", label: "Vegan", variant: BADGE_VARIANTS.vegan });
  if (dish.spicy)    badges.push({ key: "spicy",    icon: "🌶️", label: "Spicy", variant: BADGE_VARIANTS.spicy });

  if (badges.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8, ...style }}>
      {badges.map((b) => (
        <span key={b.key} style={{ ...BADGE_BASE, ...b.variant }}>
          <span>{b.icon}</span>{b.label}
        </span>
      ))}
    </div>
  );
}

// ── DishDescription: 2-line clamp, hidden if empty ──
function DishDescription({ dish, fontSize = 12.5 }) {
  if (!dish.description) return null;
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontSize,
      color: "var(--text-muted)",
      lineHeight: 1.5,
      marginTop: 4,
      marginBottom: 8,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}>
      {dish.description}
    </p>
  );
}

// ── DishMeta: clean "👥 Serves 2  ·  Min Qty 2" layout, no empty spaces ──
function DishMeta({ dish, fontSize = 11 }) {
  const parts = [];
  if (dish.unit) parts.push(dish.unit);
  if (dish.serves) parts.push(`👥 Serves ${dish.serves}`);
  if (dish.minOrder && Number(dish.minOrder) > 1) parts.push(`Min Qty ${dish.minOrder}`);

  if (parts.length === 0) return null;

  return (
    <div style={{ fontFamily: "var(--font-body)", fontSize, color: "var(--text-muted)", marginTop: 6 }}>
      {parts.join("  ·  ")}
    </div>
  );
}

// ── FilterBar: underline-tab style ──
function FilterBar({ items, activeFilter, onFilterChange, accent }) {
  const counts = FILTERS.reduce((acc, f) => { acc[f.id] = items.filter(f.match).length; return acc; }, {});
  const visible = FILTERS.filter(f => f.id === "all" || counts[f.id] > 0);
  return (
    <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--border)", marginLeft: -40, marginRight: -40, paddingLeft: 40, paddingRight: 40 }}>
      {visible.map(f => (
        <button
          key={f.id}
          className={`filter-tab ${activeFilter === f.id ? "active" : ""}`}
          style={{ "--tab-accent": accent }}
          onClick={() => onFilterChange(f.id)}
          aria-pressed={activeFilter === f.id}
        >
          {f.label}
        </button>
      ))}
      {activeFilter !== "all" && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", alignSelf: "center", marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          {counts[activeFilter]} item{counts[activeFilter] !== 1 ? "s" : ""}
          <button onClick={() => onFilterChange("all")} style={{ color: accent, fontWeight: 600, cursor: "pointer", background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: 12 }}>Clear</button>
        </span>
      )}
    </div>
  );
}

// ── OrderSheet: unchanged logic ──
function OrderSheet({ accent, color, onClose }) {
  return (
    <div className="order-sheet" role="dialog" aria-modal="true">
      <div className="order-sheet-backdrop" onClick={onClose} />
      <div className="order-sheet-panel">
        <div className="order-sheet-handle" />
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#3a2010", fontWeight: 700, marginBottom: 6 }}>📦 Order & Collect</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#907050", lineHeight: 2.1, marginBottom: 16 }}>
          <div>📱 DM us on Instagram to pre-order</div>
          <div>🚚 Local delivery available</div>
          <div>🌿 100% vegetarian · No preservatives</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a9a40", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#4a7a38", fontWeight: 700 }}>Accepting orders now</span>
        </div>
        <div style={{ background: `${color}44`, border: `1px solid ${accent}33`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "#907050", lineHeight: 1.8 }}>All dishes freshly prepared. Let us know about allergies or special requests — happy to customise! 🌿</div>
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "13px", borderRadius: 14, border: "none", background: `linear-gradient(135deg, ${accent}, #9a5a18)`, color: "#fff7ed", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Got it ✦
        </button>
      </div>
    </div>
  );
}

// ── CuisineNav: 4 pills visible at a time, arrows page through rest ──
function CuisineNav({ menuData, active, onSwitch, accent }) {
  const VISIBLE = 4;
  const [page, setPage] = useState(0);

  // when active changes, auto-flip to the page that contains it
  useEffect(() => {
    setPage(Math.floor(active / VISIBLE));
  }, [active]);

  const totalPages = Math.ceil(menuData.length / VISIBLE);
  const start = page * VISIBLE;
  const visible = menuData.slice(start, start + VISIBLE);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const ArrowBtn = ({ dir, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
        border: "1.5px solid rgba(0,0,0,0.1)",
        background: disabled ? "transparent" : "var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.25 : 1,
        transition: "opacity 0.2s ease",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        {dir === "left"
          ? <path d="M8 2L3 6L8 10" stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M4 2L9 6L4 10" stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <ArrowBtn dir="left" onClick={() => setPage(p => p - 1)} disabled={!canPrev} />

      <div style={{ flex: 1, display: "flex", gap: 6 }}>
        {visible.map((m, idx) => {
          const i = start + idx;
          const isActive = i === active;
          return (
            <button key={m.id} onClick={() => onSwitch(i)} style={{
              flex: 1, padding: "7px 4px", borderRadius: 999, minWidth: 0,
              border: `1.5px solid ${isActive ? m.accent : "rgba(0,0,0,0.1)"}`,
              background: isActive ? m.accent : "transparent",
              color: isActive ? "#fff" : "var(--text-secondary)",
              fontFamily: "var(--font-body)", fontSize: 11, fontWeight: isActive ? 600 : 400,
              cursor: "pointer", transition: "all 0.2s ease",
              WebkitTapHighlightColor: "transparent",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {m.category}
            </button>
          );
        })}
        {/* fill empty slots so layout stays stable */}
        {Array.from({ length: VISIBLE - visible.length }).map((_, i) => (
          <div key={`empty-${i}`} style={{ flex: 1 }} />
        ))}
      </div>

      <ArrowBtn dir="right" onClick={() => setPage(p => p + 1)} disabled={!canNext} />
    </div>
  );
}

// ── NEW: DishRowSkeleton / MenuSkeleton ──
// Reuses the exact .dish-row / .dish-thumb / .pulse classes already in STYLES,
// so it sits in the layout with zero visual jank once real data swaps in.
function DishRowSkeleton({ delay = 0, thumbSize = 96 }) {
  return (
    <div className="dish-row anim-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="dish-thumb pulse" style={{ width: thumbSize, height: thumbSize }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="pulse" style={{ width: "45%", height: 14, borderRadius: 4, background: "rgba(0,0,0,0.08)", marginBottom: 10 }} />
        <div className="pulse" style={{ width: "80%", height: 11, borderRadius: 4, background: "rgba(0,0,0,0.06)", marginBottom: 6 }} />
        <div className="pulse" style={{ width: "55%", height: 11, borderRadius: 4, background: "rgba(0,0,0,0.06)", marginBottom: 8 }} />
        <div className="pulse" style={{ width: "30%", height: 10, borderRadius: 4, background: "rgba(0,0,0,0.05)" }} />
      </div>
    </div>
  );
}

function MenuSkeleton({ count = 4, thumbSize = 96 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <DishRowSkeleton key={i} delay={i * 0.05} thumbSize={thumbSize} />
      ))}
    </div>
  );
}

export default function LittleFoodBox() {
  // ── STATE: added `loading` ──
  const [menuData, setMenuData] = useState(menuCache || []);
  const [loading, setLoading] = useState(!menuCache); // false immediately if cache already warm
  const [active, setActive] = useState(0);
  const [panelKey, setPanelKey] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showOrder, setShowOrder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    // Already have data from a previous mount (e.g. navigated MENU -> away -> MENU) — skip fetch entirely.
    if (menuCache) {
      setMenuData(menuCache);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchMenu = async () => {
      setLoading(true);
      try {
        // Dedupe: if a fetch is already in flight (e.g. StrictMode double-invoke,
        // or a fast remount), reuse the same promise instead of firing a second request.
        if (!menuFetchPromise) {
          menuFetchPromise = axios.get(`${import.meta.env.VITE_API_URL}/api/menu-items`);
        }
        const { data } = await menuFetchPromise;

        const grouped = {};

        data.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = {
              id: item.category.toLowerCase().replace(/\s+/g, "-"),
              category: item.category,
              tagline: "",
              color: "#f7e8d0",
              accent: "#B5451B",
              sections: [],
            };
          }

          let section = grouped[item.category].sections.find(
            (s) => s.title === item.section
          );

          if (!section) {
            section = {
              title: item.section,
              items: [],
            };

            grouped[item.category].sections.push(section);
          }

          section.items.push({
            name: item.name,
            price: item.price,
            unit: item.unit,
            serves: item.serves,
            minOrder: item.minOrder,
            chefPick: item.chefPick,
            popular: item.popular,
            spicy: item.spicy,
            image: item.image,
            category: [grouped[item.category].id],
            isAvailable: item.isAvailable,
            description: item.description || "",
            jain: item.jain || false,
          });
        });

        const result = Object.values(grouped);
        menuCache = result; // warm the cache for future mounts

        if (!cancelled) setMenuData(result);
      } catch (err) {
        console.error(err);
        menuFetchPromise = null; // allow a retry on next mount since this attempt failed
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMenu();

    return () => { cancelled = true; };
  }, []);

  // ── ALL DERIVED STATE: unchanged from original ──
  const current = menuData[active] || { sections: [], color: "#f5e6c8", accent: "#b07d3a", category: "Menu" };
  const activeFilterDef = FILTERS.find((f) => f.id === activeFilter);
  const cuisineId = current.id;

  // collect ALL sections from all cuisines
  const allSections = menuData.flatMap(c => c.sections || []);

  const filteredSections = allSections
    .map(section => ({
      ...section,
      items: section.items.filter(
        dish =>
          (!dish.category || dish.category.includes(cuisineId)) &&
          activeFilterDef.match(dish)
      )
    }))
    .filter(section => section.items.length > 0);
  const filteredItems = filteredSections.flatMap(s => s.items);
  const allItems = menuData.flatMap(c => c.sections.flatMap(s => s.items));

  // ── ALL HANDLERS: unchanged from original ──
  const switchTab = (i) => { if (i === active) return; setActive(i); setPanelKey((k) => k + 1); setActiveFilter("all"); };
  const handleFilterChange = (id) => { setActiveFilter(id); setPanelKey((k) => k + 1); };
const fmtPrice = (p) => {
  if (
    p === "Ask" ||
    p === "On Request" ||
    p === "On req" ||
    p === "" ||
    p === null ||
    p === undefined
  ) {
    return "On request";
  }

  const num = Number(p);

  if (isNaN(num)) return "On request";

  return `₹${num.toLocaleString("en-IN")}`;
};
  /* ════════════════════════════════════
     MOBILE LAYOUT
  ════════════════════════════════════ */
  if (isMobile) {
    return (
      <>
        <style>{STYLES}</style>
        {showOrder && <OrderSheet accent={current.accent} color={current.color} onClose={() => setShowOrder(false)} />}

        <div style={{ width: "100vw", height: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden", fontFamily: "var(--font-body)" }}>

          {/* MOBILE HEADER */}
          <header style={{ flexShrink: 0, padding: "16px 20px 0", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
           

            {/* category nav — 4 pills visible + arrows */}
            {!loading && <CuisineNav menuData={menuData} active={active} onSwitch={switchTab} accent={current.accent} />}

            {/* dish-level filters */}
            {!loading && (
              <div key={`mfilter-${panelKey}`} style={{ display: "flex", gap: 20, overflowX: "auto", scrollbarWidth: "none", borderBottom: "1px solid var(--border)", marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20 }}>
                {FILTERS.filter(f => f.id === "all" || allItems.filter(f.match).length > 0).map(f => (
                  <button
                    key={f.id}
                    className={`filter-tab ${activeFilter === f.id ? "active" : ""}`}
                    style={{ "--tab-accent": current.accent, flexShrink: 0 }}
                    onClick={() => handleFilterChange(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </header>

          {/* MOBILE CONTENT */}
          <div key={panelKey} className="scroll" style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px" }}>

            {loading ? (
              <div style={{ paddingTop: 20 }}>
                <MenuSkeleton count={4} thumbSize={80} />
              </div>
            ) : filteredItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ fontSize: 44, marginBottom: 12, opacity: 0.25 }}>🍱</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--text-primary)", fontWeight: 700, marginBottom: 6 }}>Nothing here!</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginBottom: 18 }}>No dishes match this filter.</div>
                <button onClick={() => handleFilterChange("all")} style={{ padding: "8px 20px", borderRadius: 999, border: `1px solid ${current.accent}`, background: "transparent", color: current.accent, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>View all</button>
              </div>
            ) : (
              filteredSections.map((section, si) => (
                <div key={section.title}>
                  {filteredSections.length > 1 && (
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-muted)", padding: "20px 0 8px" }}>
                      {section.title}
                    </div>
                  )}
                  {section.items.map((dish, i) => (
                    <div key={dish.name} className="dish-row anim-fade-up" style={{ animationDelay: `${(si * 4 + i) * 0.05}s` }}>
                      {/* Inline thumbnail */}
                      <div className="dish-thumb" style={{ width: 80, height: 80 }}>
                        <img src={dish.image} alt={dish.name}
                          onError={e => { e.currentTarget.style.opacity = "0"; }} />
                      </div>
                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <DishBadges dish={dish} style={{ marginBottom: 6 }} />
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
                          {dish.name}
                        </h3>
                        <DishDescription dish={dish} fontSize={11.5} />
                        <DishMeta dish={dish} fontSize={11} />
                      </div>
                      {/* Price */}
                      <div style={{ flexShrink: 0, alignSelf: "center" }}>
                        {dish.price === "Ask"
                          ? <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: current.accent, fontWeight: 500 }}>On request</span>
                          : <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 400, fontStyle: "italic", color: current.accent, transition: "color 0.5s ease" }}>{fmtPrice(dish.price)}</div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.9 }}>
                All dishes freshly prepared. Let us know about allergies or special requests — happy to customise! 🌿
              </p>
            </div>
          </div>

        </div>
      </>
    );
  }

  /* ════════════════════════════════════
     DESKTOP LAYOUT
  ════════════════════════════════════ */
  return (
    <>
      <style>{STYLES}</style>
      <div className="noise" style={{ width: "100vw", height: "100vh", display: "flex", overflow: "hidden", background: "var(--bg)", fontFamily: "var(--font-body)" }}>

        {/* SIDEBAR */}
        <aside style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", background: "var(--surface)", borderRight: "1px solid var(--border)", padding: "32px 16px" }}>

          <div style={{ paddingLeft: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-muted)" }}>Menu</span>
          </div>

          {/* category nav: unchanged data (menuData from fetch) */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }} className="scroll">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="pulse" style={{ height: 32, borderRadius: 8, background: "rgba(0,0,0,0.05)", margin: "3px 0" }} />
              ))
            ) : (
              menuData.map((m, i) => (
                <button key={m.id} onClick={() => switchTab(i)} className={`nav-link ${i === active ? "active" : ""}`} style={{ "--accent-bg": `${m.accent}14` }}>
                  <div style={{ width: 3, height: 16, borderRadius: 99, background: i === active ? m.accent : "transparent", transition: "background 0.2s ease", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: i === active ? 600 : 300, fontStyle: i === active ? "normal" : "italic", color: i === active ? "var(--text-primary)" : "var(--text-secondary)", transition: "all 0.2s ease" }}>
                    {m.category}
                  </span>
                  {i === active && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: m.accent, marginLeft: "auto", opacity: 0.7 }}>
                      {m.sections.flatMap(s => s.items).length}
                    </span>
                  )}
                </button>
              ))
            )}
          </nav>

          <div style={{ borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: 20, paddingLeft: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span className="pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#4a9a40", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#4a7a38", fontWeight: 500 }}>Accepting orders now</span>
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)", lineHeight: 2 }}>
              📱 DM us to pre-order<br />
              🚚 Local delivery available<br />
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <header style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>🌿 100% vegetarian · Freshly made to order</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>🛵 Free delivery over ₹1,500</span>
          </header>

          {/* category heading: uses current.tagline, current.category, allItems — all from fetched data */}
          <div key={`dhead-${active}`} style={{ padding: "28px 40px 0", flexShrink: 0, animation: "fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both" }}>
            {loading ? (
              <>
                <div className="pulse" style={{ width: 120, height: 10, borderRadius: 4, background: "rgba(0,0,0,0.06)", marginBottom: 10 }} />
                <div className="pulse" style={{ width: 220, height: 26, borderRadius: 6, background: "rgba(0,0,0,0.08)", marginBottom: 20 }} />
              </>
            ) : (
              <>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: current.accent, fontWeight: 500, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 8, transition: "color 0.4s ease" }}>
                  {current.tagline}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 20 }}>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px, 2vw, 28px)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      letterSpacing: "-1.2px",
                      lineHeight: 1
                    }}
                  >
                    {current.category}
                  </h1>
                </div>
              </>
            )}
            {!loading && (
              <FilterBar key={`fb-${panelKey}`} items={allItems} activeFilter={activeFilter} onFilterChange={handleFilterChange} accent={current.accent} />
            )}
          </div>

          {/* dish list: uses filteredSections, filteredItems — all derived from fetched data */}
          <div key={panelKey} className="scroll" style={{ flex: 1, overflowY: "auto", padding: "0 40px 40px" }}>
            {loading ? (
              <div style={{ paddingTop: 8 }}>
                <MenuSkeleton count={5} thumbSize={96} />
              </div>
            ) : filteredItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 14, opacity: 0.25 }}>🍱</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--text-primary)", fontWeight: 600, marginBottom: 8 }}>Nothing here!</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>No dishes match this filter.</div>
                <button onClick={() => handleFilterChange("all")} style={{ padding: "8px 20px", borderRadius: 999, border: `1px solid ${current.accent}`, background: "transparent", color: current.accent, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>View all</button>
              </div>
            ) : (
              filteredSections.map((section, si) => (
                <div key={section.title}>
                  {filteredSections.length > 1 && (
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-muted)", padding: "24px 0 8px" }}>
                      {section.title}
                    </div>
                  )}
                  {section.items.map((dish, i) => (
                    <div key={dish.name} className="dish-row anim-fade-up" style={{ animationDelay: `${(si * 4 + i) * 0.05}s` }}>
                      {/* Inline thumbnail */}
                      {dish.image && (
                        <div className="dish-thumb">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      {/* Text info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <DishBadges dish={dish} style={{ marginBottom: 8 }} />
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
                          {dish.name}
                        </h3>
                        <DishDescription dish={dish} fontSize={13} />
                        <DishMeta dish={dish} fontSize={12} />
                      </div>
                      {/* Price */}
                      <div style={{ flexShrink: 0, alignSelf: "center" }}>
                        {dish.price === "Ask"
                          ? <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: current.accent, fontWeight: 500 }}>On request</span>
                          : <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, fontStyle: "italic", color: current.accent, transition: "color 0.5s ease" }}>{fmtPrice(dish.price)}</div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.9 }}>
                All dishes freshly prepared. Let us know about allergies or special requests — happy to customise! 🌿
              </p>
            </div>
          </div>

        </main>

      </div>
    </>
  );
}