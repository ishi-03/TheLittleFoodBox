import { useState, useEffect, useRef } from "react";

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
    padding: 16px 12px; border-radius: 12px; margin: 0 -12px;
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

export default function LittleFoodBox() {
  // ── ALL STATE: unchanged from original ──
  const [menuData, setMenuData] = useState([]);
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

  // ── DATA FETCH: unchanged from original ──
  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
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
  const fmtPrice = (p) => p === "Ask" ? null : `₹${Number(p).toLocaleString("en-IN")}`;



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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.4px", lineHeight: 1.15 }}>
                  The Little Food Box
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                  Home kitchen · Made with love 🏡
                </div>
              </div>
              <button
                onClick={() => setShowOrder(true)}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 999, border: `1px solid ${current.accent}44`, background: `${current.color}50`, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
              >
                <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a9a40", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: current.accent }}>Order</span>
              </button>
            </div>


            {/* category nav — 4 pills visible + arrows */}
            <CuisineNav menuData={menuData} active={active} onSwitch={switchTab} accent={current.accent} />

            {/* dish-level filters */}
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
          </header>

          {/* MOBILE CONTENT */}
          <div key={panelKey} className="scroll" style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px" }}>

            {/* dish list */}
            {filteredItems.length === 0 ? (
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
                        <img src={dish.photo} alt={dish.name}
                          onError={e => { e.currentTarget.style.opacity = "0"; }} />
                      </div>
                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {(dish.chefPick || dish.popular || dish.spicy) && (
                          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                            {dish.chefPick && <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#c06060", fontWeight: 500 }}>♥ Fave</span>}
                            {dish.popular && <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#8a7030", fontWeight: 500 }}>★ Popular</span>}
                            {dish.spicy && <span style={{ fontSize: 10 }}>🌶</span>}
                          </div>
                        )}
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
                          {dish.name}
                        </h3>
                        {(dish.unit || dish.serves || dish.minOrder) && (
                          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>
                            {dish.unit}{dish.minOrder ? ` · min. ${dish.minOrder}` : ""}{dish.serves ? `Serves ${dish.serves}` : ""}
                          </div>
                        )}
                      </div>
                      {/* Price */}
                      <div style={{ flexShrink: 0 }}>
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
          <div style={{ marginBottom: 40, paddingLeft: 12 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 4 }}>
              The Little<br />Food Box
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)" }}>Home kitchen · Made with love 🏡</div>
          </div>

          <div style={{ paddingLeft: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-muted)" }}>Menu</span>
          </div>

          {/* category nav: unchanged data (menuData from fetch) */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }} className="scroll">
            {menuData.map((m, i) => (
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
            ))}
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
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: current.accent, fontWeight: 500, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 8, transition: "color 0.4s ease" }}>
              {current.tagline}
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 20 }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4vw,52px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-1.5px", lineHeight: 1 }}>
                {current.category}
              </h1>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{allItems.length} dishes</span>
            </div>
            <FilterBar key={`fb-${panelKey}`} items={allItems} activeFilter={activeFilter} onFilterChange={handleFilterChange} accent={current.accent} />
          </div>

          {/* dish list: uses filteredSections, filteredItems — all derived from fetched data */}
          <div key={panelKey} className="scroll" style={{ flex: 1, overflowY: "auto", padding: "0 40px 40px" }}>
            {filteredItems.length === 0 ? (
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
                      <div className="dish-thumb">
                        <img src={dish.photo} alt={dish.name}
                          onError={e => { e.currentTarget.style.opacity = "0"; }} />
                      </div>
                      {/* Text info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {(dish.chefPick || dish.popular || dish.spicy) && (
                          <div style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                            {dish.chefPick && <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#c06060", fontWeight: 500 }}>♥ Mum's Fave</span>}
                            {dish.popular && <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#8a7030", fontWeight: 500 }}>★ Fan Favourite</span>}
                            {dish.spicy && <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#a03020", fontWeight: 500 }}>🌶 Spicy</span>}
                          </div>
                        )}
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
                          {dish.name}
                        </h3>
                        {(dish.unit || dish.serves || dish.minOrder) && (
                          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                            {dish.unit}{dish.minOrder ? ` · min. order ${dish.minOrder}` : ""}{dish.serves ? `Serves ${dish.serves}` : ""}
                          </div>
                        )}
                      </div>
                      {/* Price */}
                      <div style={{ flexShrink: 0 }}>
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

          <footer style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10.5, color: "var(--text-muted)" }}>All prices inclusive · Service with a smile 😊</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["🌿 100% Veg", "🥚 No eggs", "🧂 Customisable"].map((t, i) => (
                <span key={i} style={{ fontFamily: "var(--font-body)", fontSize: 10.5, color: "var(--text-muted)" }}>{t}</span>
              ))}
            </div>
          </footer>
        </main>


      </div>
    </>
  );
}