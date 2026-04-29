import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .sub-root {
    font-family: 'DM Sans', sans-serif;
    background: #f7f3ec;
    min-height: 100vh;
    padding: 40px 20px;
    position: relative;
    overflow-x: hidden;
  }

  .sub-root::before {
    content: '';
    position: fixed;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(134,188,111,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .sub-root::after {
    content: '';
    position: fixed;
    bottom: -150px;
    left: -150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(212,163,89,0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .sub-container {
    max-width: 520px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* HEADER */
  .sub-header {
    text-align: center;
    margin-bottom: 36px;
    animation: fadeUp 0.6s ease both;
  }

  .sub-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(134,188,111,0.15);
    border: 1px solid rgba(134,188,111,0.3);
    color: #3d7a35;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 16px;
  }

  .sub-badge-dot {
    width: 6px;
    height: 6px;
    background: #5aaa4e;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .sub-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 600;
    color: #1e2d1a;
    margin: 0 0 10px;
    line-height: 1.2;
  }

  .sub-header h1 em {
    font-style: italic;
    color: #5aaa4e;
  }

  .sub-header p {
    color: #7a8573;
    font-size: 14px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.3px;
  }

  /* PLAN CARD */
  .plan-card {
    background: #1e2d1a;
    border-radius: 24px;
    padding: 36px 32px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.6s ease 0.1s both;
  }

  .plan-card::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(90,170,78,0.25) 0%, transparent 70%);
  }

  .plan-card::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(212,163,89,0.15) 0%, transparent 70%);
  }

  .plan-card-inner {
    position: relative;
    z-index: 1;
  }

  .plan-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 28px;
  }

  .plan-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 8px;
  }

  .plan-name {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: #fff;
    font-weight: 600;
    line-height: 1.2;
  }

  .plan-price-wrap {
    text-align: right;
  }

  .plan-price {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 600;
    color: #a8d97f;
    line-height: 1;
  }

  .plan-price-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 1px;
    margin-top: 4px;
  }

  .plan-features {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 28px;
  }

  .plan-feature {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 100px;
    font-weight: 300;
  }

  /* SELECT */
  .select-wrap {
    position: relative;
    margin-bottom: 20px;
  }

  .select-label {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .select-wrap select {
    width: 100%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 14px 16px;
    border-radius: 12px;
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .select-wrap select:focus {
    border-color: rgba(90,170,78,0.6);
    background: rgba(255,255,255,0.12);
  }

  .select-wrap select option {
    background: #1e2d1a;
    color: #fff;
  }

  .select-arrow {
    position: absolute;
    right: 16px;
    bottom: 17px;
    color: rgba(255,255,255,0.4);
    pointer-events: none;
    font-size: 12px;
  }

  /* BUTTON */
  .sub-btn {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .sub-btn:not(:disabled) {
    background: linear-gradient(135deg, #5aaa4e, #3d7a35);
    color: #fff;
    box-shadow: 0 6px 20px rgba(90,170,78,0.35);
  }

  .sub-btn:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 28px rgba(90,170,78,0.45);
  }

  .sub-btn:not(:disabled):active {
    transform: translateY(0);
  }

  .sub-btn:disabled {
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    cursor: not-allowed;
  }

  .sub-btn-success {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
    background: rgba(90,170,78,0.12);
    border: 1px solid rgba(90,170,78,0.3);
    color: #a8d97f;
    font-size: 13px;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 400;
    letter-spacing: 0.3px;
  }

  /* WEEKLY MENU */
  .menu-card {
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(30,45,26,0.07);
    animation: fadeUp 0.6s ease 0.2s both;
  }

  .menu-header {
    padding: 28px 28px 20px;
    border-bottom: 1px solid #f0ebe0;
  }

  .menu-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #a09075;
    margin-bottom: 6px;
  }

  .menu-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #1e2d1a;
    font-weight: 600;
    margin: 0;
  }

  .menu-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 28px;
    border-bottom: 1px solid #f7f3ec;
    transition: background 0.15s;
  }

  .menu-row:last-child {
    border-bottom: none;
  }

  .menu-row:hover {
    background: #faf8f4;
  }

  .menu-day {
    font-size: 13px;
    font-weight: 500;
    color: #7a8573;
    letter-spacing: 0.5px;
    min-width: 90px;
  }

  .menu-divider {
    flex: 1;
    height: 1px;
    background: #ede9df;
    margin: 0 16px;
  }

  .menu-salad {
    font-size: 13px;
    color: #2e4428;
    font-weight: 400;
  }

  .menu-row.today {
    background: linear-gradient(90deg, rgba(90,170,78,0.06), transparent);
  }

  .menu-row.today .menu-day {
    color: #3d7a35;
    font-weight: 600;
  }

  .today-badge {
    font-size: 10px;
    background: rgba(90,170,78,0.15);
    color: #3d7a35;
    border-radius: 100px;
    padding: 2px 8px;
    margin-left: 6px;
    letter-spacing: 0.5px;
    font-weight: 500;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
`;

const weeklyMenu = [
  { day: "Monday", salad: "🥗 Sprouts Salad" },
  { day: "Tuesday", salad: "🧀 Paneer Salad" },
  { day: "Wednesday", salad: "🍓 Fruit Bowl" },
  { day: "Thursday", salad: "🥗 Greek Veg Salad" },
  { day: "Friday", salad: "🌽 Corn Salad" },
  { day: "Saturday", salad: "🥗 Chickpea Salad" },
  { day: "Sunday", salad: "✨ Detox Bowl" },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayName = dayNames[new Date().getDay()];

const Subscriptions = () => {
  const [timeSlot, setTimeSlot] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { alert("Please login first"); return; }

    const res = await fetch("https://thelittlefoodbox.onrender.com/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeSlot, userId: user._id }),
    });

    const data = await res.json();
    console.log("RESPONSE 👉", data);
    setSubscribed(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sub-root">
        <button
  onClick={() => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  }}
  style={{
    position: "absolute",
    top: "90px",
    left: "24px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#3d7a35",
    zIndex: 10,
    transition: "color 0.2s"
  }}
  onMouseEnter={e => e.currentTarget.style.color = "#5aaa4e"}
  onMouseLeave={e => e.currentTarget.style.color = "#3d7a35"}
>
  ←
</button>
        <div className="sub-container">

          {/* HEADER */}
          <div className="sub-header">
            <div className="sub-badge">
              <span className="sub-badge-dot" />
              Fresh Daily Delivery
            </div>
            <h1>Eat <em>fresh,</em> feel alive</h1>
            <p>Hand-crafted salads delivered to your door every morning</p>
          </div>

          {/* PLAN CARD */}
          <div className="plan-card">
            <div className="plan-card-inner">
              <div className="plan-top">
                <div>
                  <div className="plan-label">Monthly Plan</div>
                  <div className="plan-name">Salad<br />Subscription</div>
                </div>
                <div className="plan-price-wrap">
                  <div className="plan-price">₹1799</div>
                  <div className="plan-price-sub">per month</div>
                </div>
              </div>

              <div className="plan-features">
                <span className="plan-feature">🌿 Daily delivery</span>
                <span className="plan-feature">🥗 7 varieties</span>
                <span className="plan-feature">✦ No preservatives</span>
              </div>

              <div className="select-wrap">
                <div className="select-label">Delivery Time</div>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                  <option value="">Choose a time slot</option>
                  <option>8 AM – 10 AM</option>
                  <option>12 PM – 2 PM</option>
                  <option>6 PM – 8 PM</option>
                </select>
                <span className="select-arrow">▾</span>
              </div>

              <button
                className="sub-btn"
                onClick={handleSubscribe}
                disabled={subscribed || !timeSlot}
              >
                {subscribed ? "Subscribed ✅" : "Start My Subscription →"}
              </button>

              {subscribed && (
                <div className="sub-btn-success">
                  🎉 Your salad plan is active — enjoy fresh daily!
                </div>
              )}
            </div>
          </div>

          {/* WEEKLY MENU */}
          <div className="menu-card">
            <div className="menu-header">
              <div className="menu-label">What's on the table</div>
              <h2 className="menu-title">This Week's Menu</h2>
            </div>

            {weeklyMenu.map((item, index) => (
              <div
                key={index}
                className={`menu-row${item.day === todayName ? " today" : ""}`}
              >
                <span className="menu-day">
                  {item.day}
                  {item.day === todayName && <span className="today-badge">Today</span>}
                </span>
                <div className="menu-divider" />
                <span className="menu-salad">{item.salad}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Subscriptions;