import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ============================================================
   DESIGN TOKENS
   Cream / sage / forest palette carried over from the existing
   brand system, pushed toward a more premium, editorial feel.
   ============================================================ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; }

  .sub-root {
    font-family: 'DM Sans', sans-serif;
    background: #FAF7F0;
    min-height: 100vh;
    padding: 0 20px 100px;
    position: relative;
    overflow-x: hidden;
    color: #1B2818;
  }

  .sub-root::before {
    content: '';
    position: fixed;
    top: -220px;
    right: -220px;
    width: 640px;
    height: 640px;
    background: radial-gradient(circle, rgba(143,191,122,0.14) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .sub-root::after {
    content: '';
    position: fixed;
    bottom: -180px;
    left: -180px;
    width: 560px;
    height: 560px;
    background: radial-gradient(circle, rgba(212,167,91,0.10) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .sub-container {
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .back-btn {
    position: sticky;
    top: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(27,40,24,0.08);
    color: #3D7A35;
    font-size: 18px;
    cursor: pointer;
    z-index: 20;
    transition: transform 0.2s ease, background 0.2s ease;
    margin-top: 28px;
  }
  .back-btn:hover { transform: translateX(-3px); background: #fff; }

  /* ============ HERO ============ */
  .hero {
    position: relative;
    padding: 30px 10px 60px;
    text-align: center;
  }

  .hero-ring-wrap {
    position: relative;
    width: 190px;
    height: 190px;
    margin: 0 auto 20px;
  }

  .hero-ring {
    position: absolute;
    inset: 0;
    animation: spin 22s linear infinite;
  }

  .hero-bowl {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 54px;
    filter: drop-shadow(0 10px 18px rgba(27,40,24,0.18));
    animation: bob 4.5s ease-in-out infinite;
  }

  .floaty {
    position: absolute;
    font-size: 22px;
    opacity: 0.9;
    filter: drop-shadow(0 6px 10px rgba(27,40,24,0.12));
  }
  .floaty-1 { top: 4%; left: 2%; animation: floatA 6s ease-in-out infinite; }
  .floaty-2 { top: 10%; right: 0%; animation: floatB 7s ease-in-out infinite; }
  .floaty-3 { bottom: 12%; left: -2%; animation: floatC 6.5s ease-in-out infinite; }
  .floaty-4 { bottom: 2%; right: 4%; animation: floatA 5.5s ease-in-out infinite 0.6s; }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(143,191,122,0.16);
    border: 1px solid rgba(143,191,122,0.32);
    color: #3D7A35;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 100px;
    margin-bottom: 22px;
  }
  .hero-dot { width: 6px; height: 6px; background: #5AAA4E; border-radius: 50%; animation: pulse 2s infinite; }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 5.4vw, 58px);
    font-weight: 600;
    line-height: 1.08;
    margin: 0 0 16px;
    letter-spacing: -0.01em;
  }
  .hero h1 em { font-style: italic; color: #4F8C3E; }

  .hero p.sub {
    max-width: 480px;
    margin: 0 auto 34px;
    color: #6E7A65;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.6;
  }

  .trust-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(27,40,24,0.07);
    padding: 9px 16px;
    border-radius: 100px;
    font-size: 12.5px;
    font-weight: 500;
    color: #3E4A38;
    box-shadow: 0 4px 14px rgba(27,40,24,0.05);
  }

  /* ============ PROGRESS STEPS ============ */
  .progress-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin: 0 0 46px;
  }
  .progress-step {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .progress-node {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    background: #EDE9DC;
    color: #A09075;
    transition: all 0.35s ease;
    flex-shrink: 0;
  }
  .progress-node.active {
    background: linear-gradient(135deg, #5AAA4E, #3D7A35);
    color: #fff;
    box-shadow: 0 4px 14px rgba(90,170,78,0.4);
  }
  .progress-node.done { background: #1B2818; color: #A8D97F; }
  .progress-label {
    font-size: 12.5px;
    font-weight: 500;
    color: #A09075;
    white-space: nowrap;
  }
  .progress-label.active { color: #1B2818; }
  .progress-bar {
    width: 44px;
    height: 2px;
    background: #EDE9DC;
    margin: 0 12px;
    border-radius: 2px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: #5AAA4E;
    width: 0%;
    transition: width 0.5s ease;
  }

  /* ============ SECTION HEADER ============ */
  .section-head {
    margin-bottom: 26px;
  }
  .section-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8A9C7F;
    margin-bottom: 6px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: #1B2818;
    margin: 0;
  }

  /* ============ PLAN GRID ============ */
  .plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 18px;
    margin-bottom: 34px;
  }

  .plan-card {
    position: relative;
    background: #fff;
    border-radius: 24px;
    padding: 26px 22px;
    cursor: pointer;
    border: 1.5px solid rgba(27,40,24,0.07);
    transition: transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s ease, border-color 0.28s ease;
    box-shadow: 0 6px 20px rgba(27,40,24,0.05);
  }
  .plan-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(27,40,24,0.10);
  }
  .plan-card.selected {
    border-color: #5AAA4E;
    box-shadow: 0 0 0 4px rgba(90,170,78,0.14), 0 16px 34px rgba(90,170,78,0.18);
    transform: translateY(-4px);
  }
  .plan-card.selected::after {
    content: '✓';
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #5AAA4E;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: popIn 0.3s ease;
  }

  .plan-popular {
    position: absolute;
    top: -11px;
    left: 22px;
    background: linear-gradient(135deg, #D4A75B, #B98A3E);
    color: #fff;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.6px;
    padding: 5px 12px;
    border-radius: 100px;
    box-shadow: 0 4px 10px rgba(212,167,91,0.4);
  }

  .plan-icon {
    font-size: 26px;
    margin-bottom: 12px;
    display: inline-block;
  }

  .plan-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    font-weight: 600;
    margin: 0 0 4px;
    color: #1B2818;
  }

  .plan-card .plan-units {
    font-size: 12.5px;
    color: #8A9C7F;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .plan-price-row {
    display: flex;
    align-items: baseline;
    gap: 5px;
    margin-bottom: 4px;
  }
  .plan-price-row .amt {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 600;
    color: #1B2818;
  }
  .plan-price-row .per {
    font-size: 12px;
    color: #A09075;
  }
  .plan-per-unit {
    font-size: 11.5px;
    color: #8A9C7F;
    margin-bottom: 16px;
  }

  .plan-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .plan-tag {
    font-size: 10.5px;
    font-weight: 500;
    background: #F3F6EE;
    color: #4F8C3E;
    padding: 4px 9px;
    border-radius: 100px;
  }

  /* ============ LOGISTICS CARD ============ */
  .logistics-card {
    background: #1B2818;
    border-radius: 24px;
    padding: 30px 28px;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
  }
  .logistics-card::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(90,170,78,0.22) 0%, transparent 70%);
  }
  .logistics-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media (max-width: 560px) { .logistics-inner { grid-template-columns: 1fr; } }

  .field-label {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 9px;
    font-weight: 500;
  }

  .slot-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .slot-pill {
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    color: rgba(255,255,255,0.75);
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .slot-pill:hover { background: rgba(255,255,255,0.12); }
  .slot-pill.active {
    background: linear-gradient(135deg, #5AAA4E, #3D7A35);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 14px rgba(90,170,78,0.4);
  }
.variant-pill{
  padding:10px 14px;
  border-radius:12px;
  background:#fff;
  border:1px solid #5AAA4E;
  color:#3D7A35;
  font-size:13px;
  font-weight:600;
  cursor:pointer;
}

.variant-pill.active{
  background:#5AAA4E;
  color:#fff;
}
  .date-input {
    width: 100%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    padding: 13px 15px;
    border-radius: 12px;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
  }

  /* ============ SALAD SECTION (collapsible) ============ */
  .salad-section {
    overflow: hidden;
    transition: max-height 0.6s cubic-bezier(.2,.8,.2,1), opacity 0.5s ease;
  }
  .salad-section.collapsed { max-height: 0; opacity: 0; }
  .salad-section.expanded { max-height: 6000px; opacity: 1; }

  .day-card {
    background: #fff;
    border-radius: 20px;
    padding: 22px 22px 24px;
    margin-bottom: 16px;
    border: 1px solid rgba(27,40,24,0.06);
    box-shadow: 0 4px 16px rgba(27,40,24,0.04);
    animation: fadeUp 0.5s ease both;
  }

  .day-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .day-title { display: flex; align-items: center; gap: 10px; }
  .day-num {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: #F3F6EE;
    color: #4F8C3E;
    font-size: 12.5px;
    font-weight: 600;
    display: flex; align-items: center; justify-content: center;
  }
  .day-title h4 { margin: 0; font-size: 15px; font-weight: 600; color: #1B2818; }
  .day-selected-name { font-size: 12px; color: #8A9C7F; margin-top: 1px; }

  .chip-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
  }
  .chip-row::-webkit-scrollbar { height: 5px; }
  .chip-row::-webkit-scrollbar-thumb { background: #E0DACB; border-radius: 10px; }

  .salad-chip {
    flex: 0 0 auto;
    width: 128px;
    border-radius: 16px;
    border: 1.5px solid rgba(27,40,24,0.07);
    background: #FDFCF8;
    padding: 10px;
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    position: relative;
  }
  .salad-chip:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(27,40,24,0.08); }
  .salad-chip.selected {
    border-color: #5AAA4E;
    background: #F3FAF0;
    box-shadow: 0 0 0 3px rgba(90,170,78,0.14);
  }
  .salad-chip.selected .chip-check {
    opacity: 1;
    transform: scale(1);
  }
  .chip-thumb {
    width: 100%;
    height: 62px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #E7F3E0, #F3F6EE);
  }
  .chip-check {
    position: absolute;
    top: 6px; right: 6px;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #5AAA4E;
    color: #fff;
    font-size: 11px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transform: scale(0.4);
    transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
  }
  .chip-name { font-size: 11.5px; font-weight: 600; color: #1B2818; line-height: 1.25; margin-bottom: 2px; }
  .chip-kcal { font-size: 10px; color: #8A9C7F; }

  .detail-toggle {
    margin-top: 14px;
    font-size: 12px;
    font-weight: 500;
    color: #4F8C3E;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  /* ============ EXPANDED SALAD DETAIL CARD (restaurant style) ============ */
  .salad-detail-panel {
    margin-top: 14px;
    background: #FAF8F2;
    border: 1px solid rgba(27,40,24,0.06);
    border-radius: 20px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(27,40,24,0.05);
    animation: fadeUp 0.35s ease both;
  }

  .detail-grid {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .detail-image-col {
    flex: 0 0 45%;
    max-width: 45%;
    position: relative;
    cursor: zoom-in;
    min-height: 260px;
  }
  .detail-image-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .detail-zoom-badge {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(27,40,24,0.15);
  }

  .detail-content-col {
    flex: 1 1 55%;
    max-width: 55%;
    padding: 26px 28px;
    display: flex;
    flex-direction: column;
  }

  .salad-detail-panel h5 {
    font-family: 'Playfair Display', serif;
    margin: 0 0 8px;
    font-size: 20px;
    color: #1B2818;
  }
  .salad-detail-panel p.desc {
    color: #7C8874;
    font-size: 13px;
    margin: 0 0 18px;
    line-height: 1.6;
  }

  @media (max-width: 720px) {
    .detail-grid { flex-direction: column; }
    .detail-image-col {
      flex: 0 0 auto;
      max-width: 100%;
      width: 100%;
      height: 220px;
      min-height: 220px;
    }
    .detail-content-col {
      max-width: 100%;
      padding: 20px 20px 24px;
    }
  }

  .macro-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(76px, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }
  .macro-cell { background: #fff; border-radius: 10px; padding: 8px 10px; border: 1px solid rgba(27,40,24,0.05); }
  .macro-cell .k { font-size: 10px; color: #A09075; text-transform: uppercase; letter-spacing: 0.5px; }
  .macro-cell .v { font-size: 14px; font-weight: 600; color: #1B2818; }

  .tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .diet-tag {
    font-size: 10.5px; font-weight: 600;
    padding: 4px 10px; border-radius: 100px;
  }
  .diet-tag.protein { background: #E7F3E0; color: #3D7A35; }
  .diet-tag.lowcarb { background: #FDF3E7; color: #9C6B1E; }
  .diet-tag.vegan { background: #E7F3E0; color: #2E7D32; }
  .diet-tag.jain { background: #FEF3C7; color: #92400E; }
  .diet-tag.keto { background: #EFE7F6; color: #6A3D9C; }

  .ing-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .ing-chip { font-size: 11px; background: #fff; border: 1px solid rgba(27,40,24,0.07); padding: 4px 10px; border-radius: 100px; color: #4A5643; }

  /* ============ STICKY SUMMARY ============ */
  .summary-bar {
    position: sticky;
    bottom: 18px;
    z-index: 30;
    margin-top: 30px;
    animation: fadeUp 0.4s ease both;
  }
  .summary-card {
    background: rgba(27,40,24,0.92);
    backdrop-filter: blur(14px);
    border-radius: 20px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
    box-shadow: 0 16px 40px rgba(0,0,0,0.25);
  }
  .summary-left { display: flex; gap: 24px; flex-wrap: wrap; }
  .summary-item .k { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.45); margin-bottom: 3px; }
  .summary-item .v { font-size: 14px; font-weight: 600; color: #fff; }
  .summary-item .v.price { color: #A8D97F; font-family: 'Playfair Display', serif; font-size: 18px; }

  .cta-btn {
    padding: 14px 26px;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: all 0.25s ease;
    white-space: nowrap;
    background: linear-gradient(135deg, #5AAA4E, #3D7A35);
    color: #fff;
    box-shadow: 0 6px 20px rgba(90,170,78,0.4);
  }
  .cta-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(90,170,78,0.5); }
  .cta-btn:disabled { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.4); cursor: not-allowed; box-shadow: none; }

  .success-banner {
    display: flex; align-items: center; gap: 10px;
    background: rgba(90,170,78,0.14);
    border: 1px solid rgba(90,170,78,0.32);
    color: #2F6B28;
    font-size: 14px;
    font-weight: 500;
    padding: 16px 20px;
    border-radius: 16px;
    margin-top: 20px;
    animation: fadeUp 0.4s ease both;
  }

  .hint-text { font-size: 12.5px; color: #A09075; margin-top: 10px; text-align: center; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
  @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes floatA { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(8deg); } }
  @keyframes floatB { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-10deg); } }
  @keyframes floatC { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(6deg); } }

  @media (prefers-reduced-motion: reduce) {
    .hero-ring, .hero-bowl, .floaty, .hero-dot { animation: none !important; }
  }
`;

/* Derive display-only diet tags from real salad data (no fabricated fields) */
function deriveTags(salad) {
  const tags = [];
  if (typeof salad.protein === "number" && salad.protein >= 20) tags.push({ key: "protein", label: "High Protein" });
  if (typeof salad.carbs === "number" && salad.carbs <= 15) tags.push({ key: "lowcarb", label: "Low Carb" });
  if (salad.variants?.vegan) tags.push({ key: "vegan", label: "Vegan" });
  if (salad.variants?.jain) tags.push({ key: "jain", label: "Jain" });
  if (typeof salad.carbs === "number" && typeof salad.fat === "number" && salad.carbs <= 10 && salad.fat >= 15) {
    tags.push({ key: "keto", label: "Keto" });
  }
  return tags;
}

const Subscriptions = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [plans, setPlans] = useState([]);
  const [slots, setSlots] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [salads, setSalads] = useState([]);
  const [mealSelections, setMealSelections] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const saladSectionRef = useRef(null);
useEffect(() => {
  const close = (e) => {
    if (e.key === "Escape") {
      setPreviewImage(null);
    }
  };

  window.addEventListener("keydown", close);

  return () =>
    window.removeEventListener("keydown", close);
}, []);
  useEffect(() => {
    loadPlans();
    loadSlots();
    loadSalads();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription-plans`);
      const data = await res.json();
      if (data.success) setPlans(data.plans.filter((p) => p.active));
    } catch (err) {
      console.log(err);
    }
  };

  const loadSalads = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/salads`);
      const data = await res.json();
      if (data.success) setSalads(data.salads.filter((s) => s.active));
    } catch (err) {
      console.log(err);
    }
  };

  const loadSlots = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/delivery-slots`);
      const data = await res.json();
      if (data.success) setSlots(data.slots.filter((s) => s.active));
    } catch (err) {
      console.log(err);
    }
  };

  const currentPlan = useMemo(() => plans.find((p) => p._id === selectedPlan), [plans, selectedPlan]);
  const currentSlot = useMemo(() => slots.find((s) => s._id === selectedSlot), [slots, selectedSlot]);

  const selectedSaladCount = useMemo(
    () => mealSelections.filter((m) => m.salad).length,
    [mealSelections]
  );

  const allDaysFilled = mealSelections.length > 0 && mealSelections.every((m) => m.salad);

  // Selecting a plan immediately builds the per-day meal slots
  // (client-side only) and reveals the "Choose Your Salads" section.
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan._id);
    const meals = [];
    for (let i = 1; i <= plan.units; i++) meals.push({ day: i, salad: "" });
    setMealSelections(meals);
    setExpandedDay(null);
    setTimeout(() => {
      saladSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  const handlePickSalad = (dayIndex, salad) => {
    setMealSelections((prev) => {
      const updated = [...prev];
updated[dayIndex] = {
  ...updated[dayIndex],
  salad: salad._id,
  selectedSalad: salad,
  variant: "regular",
};      return updated;
    });
  };

  // Single CTA: creates the subscription, then saves the chosen
  // per-day salads on it. Preserves the original two API calls,
  // just consolidated behind one button click as requested.
const handleStartSubscription = () => {
  if (!selectedPlan || !selectedSlot || !startDate) {
    alert("Please select a plan, delivery slot and start date");
    return;
  }

  if (!allDaysFilled) {
    alert("Please select a salad for every day");
    return;
  }

  navigate(`/checkout/${selectedPlan}`, {
    state: {
      plan: currentPlan,
      slot: currentSlot,
      startDate,
      mealSelections,
    },
  });
};
  const step = !selectedPlan ? 1 : !allDaysFilled ? 2 : 3;

  return (
    <>
      <style>{styles}</style>
      <div className="sub-root">
        <button
          className="back-btn"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
        >
          ←
        </button>

        <div className="sub-container">
          {/* ============ HERO ============ */}
          <div className="hero">
            <div className="hero-ring-wrap">
              <svg className="hero-ring" viewBox="0 0 190 190" width="190" height="190">
                <circle cx="95" cy="95" r="86" fill="none" stroke="#5AAA4E" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" />
              </svg>
              <div className="hero-bowl">🥗</div>
              <span className="floaty floaty-1">🥬</span>
              <span className="floaty floaty-2">🍅</span>
              <span className="floaty floaty-3">🥒</span>
              <span className="floaty floaty-4">🥑</span>
            </div>

            <div className="hero-eyebrow">
              <span className="hero-dot" />
              Fresh Daily Delivery
            </div>
            <h1>Eat <em>fresh.</em> Feel better.<br />Every day.</h1>
            <p className="sub">
              Chef-crafted salads, tailored to your goals and delivered to your door
              each morning — a premium ritual for a healthier week.
            </p>

            <div className="trust-row">
              <div className="trust-badge">🌿 Fresh Daily</div>
              <div className="trust-badge">🩺 Nutritionist Approved</div>
              <div className="trust-badge">🎛️ Customizable</div>
              <div className="trust-badge">🚚 Free Delivery</div>
            </div>
          </div>

          {/* ============ PROGRESS ============ */}
          <div className="progress-wrap">
            <div className="progress-step">
              <div className={`progress-node ${step === 1 ? "active" : "done"}`}>{step > 1 ? "✓" : "1"}</div>
              <span className={`progress-label ${step === 1 ? "active" : ""}`}>Choose Plan</span>
            </div>
            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: step > 1 ? "100%" : "0%" }} /></div>
            <div className="progress-step">
              <div className={`progress-node ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>{step > 2 ? "✓" : "2"}</div>
              <span className={`progress-label ${step === 2 ? "active" : ""}`}>Choose Salads</span>
            </div>
            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: step > 2 ? "100%" : "0%" }} /></div>
            <div className="progress-step">
              <div className={`progress-node ${step === 3 ? "active" : ""}`}>3</div>
              <span className={`progress-label ${step === 3 ? "active" : ""}`}>Checkout</span>
            </div>
          </div>

          {/* ============ STEP 1: PLAN ============ */}
          <div className="section-head">
            <div className="section-eyebrow">Step 1</div>
            <h2 className="section-title">Choose your plan</h2>
          </div>

          <div className="plan-grid">
            {plans.map((plan, idx) => (
              <div
                key={plan._id}
                className={`plan-card ${selectedPlan === plan._id ? "selected" : ""}`}
                onClick={() => handleSelectPlan(plan)}
              >
                {idx === 1 && <div className="plan-popular">MOST POPULAR</div>}
                <div className="plan-icon">{idx === 0 ? "🥗" : idx === 1 ? "🌿" : "✨"}</div>
                <h3>{plan.name}</h3>
                <div className="plan-units">{plan.units} meals · {plan.validity} days</div>
                <div className="plan-price-row">
                  <span className="amt">₹{plan.price}</span>
                  <span className="per">total</span>
                </div>
                <div className="plan-per-unit">₹{plan.pricePerUnit} / meal</div>
                <div className="plan-tags">
                  {plan.deliveryPatterns?.slice(0, 2).map((d) => (
                    <span className="plan-tag" key={d}>{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ============ LOGISTICS: slot + date ============ */}
          <div className="logistics-card">
            <div className="logistics-inner">
              <div>
                <div className="field-label">Delivery Slot</div>
                <div className="slot-pills">
                  {slots.map((slot) => (
                    <div
                      key={slot._id}
                      className={`slot-pill ${selectedSlot === slot._id ? "active" : ""}`}
                      onClick={() => setSelectedSlot(slot._id)}
                    >
                      {slot.shift} • {slot.startTime}-{slot.endTime}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="field-label">Start Date</div>
                <input
                  type="date"
                  className="date-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ============ STEP 2: SALADS (auto-expands on plan select) ============ */}
          <div ref={saladSectionRef} className={`salad-section ${selectedPlan ? "expanded" : "collapsed"}`}>
            <div className="section-head">
              <div className="section-eyebrow">Step 2</div>
              <h2 className="section-title">Choose your salads</h2>
            </div>

            {mealSelections.map((meal, index) => {
              const isExpanded = expandedDay === meal.day;
              const selectedSalad = meal.selectedSalad || salads.find((s) => s._id === meal.salad);

              return (
                <div className="day-card" key={meal.day} style={{ animationDelay: `${index * 0.04}s` }}>
                  <div className="day-card-head">
                    <div className="day-title">
                      <div className="day-num">{meal.day}</div>
                      <div>
                        <h4>Day {meal.day}</h4>
                        {selectedSalad && <div className="day-selected-name">{selectedSalad.name}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="chip-row">
                    {salads.map((salad) => (
                      <div
                        key={salad._id}
                        className={`salad-chip ${meal.salad === salad._id ? "selected" : ""}`}
                        onClick={() => handlePickSalad(index, salad)}
                      >
                        <span className="chip-check">✓</span>
<div className="chip-thumb">
  <img
    src={salad.image}
    alt={salad.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
    }}
  />
</div>                        <div className="chip-name">{salad.name}</div>
                        <div className="chip-kcal">{salad.calories} kcal</div>
                      </div>
                    ))}
                  </div>

                {selectedSalad && (
  <>
    <div className="tag-row" style={{ marginTop: "12px" }}>
      {selectedSalad.variants?.vegan && (
        <button
          type="button"
          className={`variant-pill ${
            meal.variant === "vegan" ? "active" : ""
          }`}
         onClick={() =>
  setMealSelections((prev) => {
    const updated = [...prev];

    updated[index] = {
      ...updated[index],
      variant:
        updated[index].variant === "vegan"
          ? "regular"
          : "vegan",
    };

    return updated;
  })
}
        >
          🌱 Vegan
        </button>
      )}

      {selectedSalad.variants?.jain && (
        <button
          type="button"
          className={`variant-pill ${
            meal.variant === "jain" ? "active" : ""
          }`}
         onClick={() =>
  setMealSelections((prev) => {
    const updated = [...prev];

    updated[index] = {
      ...updated[index],
      variant:
        updated[index].variant === "jain"
          ? "regular"
          : "jain",
    };

    return updated;
  })
}
        >
          🪷 Jain
        </button>
      )}
    </div>

    <button
      className="detail-toggle"
      onClick={() => setExpandedDay(isExpanded ? null : meal.day)}
    >
      {isExpanded ? "Hide details ▲" : "View nutrition & details ▼"}
    </button>
  </>
)}

                  {isExpanded && selectedSalad && (
                    <div className="salad-detail-panel">
                      <div className="detail-grid">
                        <div
                          className="detail-image-col"
                          onClick={() => setPreviewImage(selectedSalad.image)}
                        >
                          <img src={selectedSalad.image} alt={selectedSalad.name} />
                          <div className="detail-zoom-badge">🔍</div>
                        </div>

                        <div className="detail-content-col">
                          <h5>{selectedSalad.name}</h5>
                          <p className="desc">{selectedSalad.description}</p>

                          <div className="macro-grid">
                            <div className="macro-cell"><div className="k">Calories</div><div className="v">{selectedSalad.calories}</div></div>
                            <div className="macro-cell"><div className="k">Protein</div><div className="v">{selectedSalad.protein}g</div></div>
                            <div className="macro-cell"><div className="k">Carbs</div><div className="v">{selectedSalad.carbs}g</div></div>
                            <div className="macro-cell"><div className="k">Fat</div><div className="v">{selectedSalad.fat}g</div></div>
                          </div>

                          <div className="tag-row">
                            {deriveTags(selectedSalad).map((t) => (
                              <span key={t.key} className={`diet-tag ${t.key}`}>{t.label}</span>
                            ))}
                          </div>

                          {selectedSalad.ingredients?.length > 0 && (
                            <div className="ing-row">
                              {selectedSalad.ingredients.map((item, i) => (
                                <span key={i} className="ing-chip">{item}</span>
                              ))}
                            </div>
                          )}

                          {selectedSalad.dressings?.length > 0 && (
                            <p className="desc" style={{ margin: 0 }}>
                              Dressing: {selectedSalad.dressings.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {subscribed && (
            <div className="success-banner">
              🎉 You're subscribed! Redirecting to your subscription…
            </div>
          )}
        </div>

        {/* ============ STICKY SUMMARY + CTA (only after 1+ salad picked) ============ */}
        {selectedPlan && selectedSaladCount > 0 && !subscribed && (
          <div className="sub-container">
            <div className="summary-bar">
              <div className="summary-card">
                <div className="summary-left">
                  <div className="summary-item">
                    <div className="k">Plan</div>
                    <div className="v">{currentPlan?.name}</div>
                  </div>
                  <div className="summary-item">
                    <div className="k">Salads Chosen</div>
                    <div className="v">{selectedSaladCount} / {mealSelections.length}</div>
                  </div>
                  <div className="summary-item">
                    <div className="k">Delivery</div>
                    <div className="v">{currentSlot ? currentSlot.shift : "Not set"}</div>
                  </div>
                  <div className="summary-item">
                    <div className="k">Total</div>
                    <div className="v price">₹{currentPlan?.price}</div>
                  </div>
                </div>
                <button
                  className="cta-btn"
                  disabled={!allDaysFilled || !selectedSlot || !startDate || submitting}
                  onClick={handleStartSubscription}
                >
                  {submitting ? "Starting…" : "Start My Subscription →"}
                </button>
              </div>
              {(!allDaysFilled || !selectedSlot || !startDate) && (
                <div className="hint-text">
                  {!allDaysFilled
                    ? "Select a salad for every day to continue"
                    : "Pick a delivery slot and start date to continue"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {previewImage && (
  <div
    onClick={() => setPreviewImage(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
      cursor: "zoom-out",
      padding: "30px",
    }}
  >
    <img
      src={previewImage}
      alt=""
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,.5)",
      }}
    />

    <button
      onClick={() => setPreviewImage(null)}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        width: 45,
        height: 45,
        borderRadius: "50%",
        border: "none",
        background: "white",
        fontSize: "22px",
        cursor: "pointer",
      }}
    >
      ✕
    </button>
  </div>
)}
    </>
  );
};

export default Subscriptions;