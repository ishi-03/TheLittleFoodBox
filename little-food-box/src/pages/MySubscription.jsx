import React, { useEffect, useState } from "react";

const MySubscription = () => {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    fetch(`https://thelittlefoodbox.onrender.com/api/subscriptions/${user._id}`)
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  if (!user) return (
    <div style={styles.page}>
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>🔒</div>
        <h3 style={styles.emptyTitle}>Please log in</h3>
        <p style={styles.emptyText}>Sign in to view your subscription plans.</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(61,107,79,0.2); }
          50%       { box-shadow: 0 0 0 5px rgba(61,107,79,0.1); }
        }
        .sub-card { animation: fadeUp 0.5s ease both; transition: transform 0.2s, box-shadow 0.2s; }
        .sub-card:hover { transform: translateY(-3px) !important; box-shadow: 0 10px 40px rgba(59,35,20,0.12) !important; }
        .manage-btn { transition: background 0.2s, color 0.2s; }
        .manage-btn:hover { background: #e8602c !important; color: #fff !important; }
        .status-dot::before {
          content: ''; display: inline-block; width: 8px; height: 8px;
          border-radius: 50%; background: #3d6b4f;
          box-shadow: 0 0 0 3px rgba(61,107,79,0.2);
          animation: pulse 2s infinite; margin-right: 7px; vertical-align: middle;
        }
      `}</style>

      <div style={styles.page}>
        {/* Header */}
        <div style={{ ...styles.header, animation: "fadeUp 0.6s ease both" }}>
          <div style={styles.headerLabel}>The Little Food Box</div>
          <h1 style={styles.h1}>My Subscriptions</h1>
          <p style={styles.subtext}>Manage your active meal delivery plans</p>
        </div>

        {/* Summary bar */}
        <div style={{ ...styles.summaryBar, animation: "fadeUp 0.6s 0.1s ease both" }}>
          <span style={{ fontSize: 20 }}>📦</span>
          <div>
            <div style={styles.countText}>{data.length}</div>
            <div style={styles.summaryLabel}>Active Plans</div>
          </div>
          <span style={styles.badge}>All Active</span>
        </div>

        {/* Cards or empty */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {data.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🍱</div>
              <h3 style={styles.emptyTitle}>No subscriptions yet</h3>
              <p style={styles.emptyText}>You haven't signed up for any plans. Start your first box today.</p>
              <button style={styles.emptyBtn}>Browse Plans</button>
            </div>
          ) : (
            data.map((sub, i) => (
              <div
                key={i}
                className="sub-card"
                style={{ ...styles.card, animationDelay: `${i * 0.08}s` }}
              >
                <div style={styles.cardNumber}>{String(i + 1).padStart(2, "0")}</div>
                <div style={styles.cardPlan}>{sub.plan}</div>
                <div style={styles.chipRow}>
                  <span style={styles.chip}>🕐 <strong>{sub.timeSlot}</strong></span>
                  <span style={styles.chip}>📅 <strong>Weekly</strong></span>
                </div>
                <div style={styles.cardFooter}>
                  <span className="status-dot" style={styles.statusDot}>Active</span>
                  <button className="manage-btn" style={styles.manageBtn}>Manage Plan →</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px",
    fontFamily: "'DM Sans', sans-serif",
    background: "#faf6f1", minHeight: "100vh", color: "#3b2314",
  },
  header: { marginBottom: 40 },
  headerLabel: {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#e8602c", marginBottom: 10,
  },
  h1: {
    fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 40px)",
    fontWeight: 700, color: "#3b2314", lineHeight: 1.15, letterSpacing: "-0.01em",
  },
  subtext: { marginTop: 8, fontSize: 14, color: "#c09070", fontWeight: 300 },
  summaryBar: {
    display: "flex", alignItems: "center", gap: 10,
    background: "#3b2314", color: "#fff",
    borderRadius: 14, padding: "14px 20px", marginBottom: 28,
  },
  countText: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, lineHeight: 1 },
  summaryLabel: { fontSize: 12, color: "#c09070", letterSpacing: "0.05em", textTransform: "uppercase" },
  badge: {
    marginLeft: "auto", background: "#e8602c", color: "#fff",
    fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 20,
  },
  card: {
    background: "#fff", borderRadius: 20, padding: 28,
    boxShadow: "0 4px 30px rgba(59,35,20,0.08)", position: "relative",
    overflow: "hidden", border: "1px solid rgba(192,144,112,0.15)",
    borderTop: "4px solid #e8602c",
  },
  cardNumber: {
    position: "absolute", top: 16, right: 22,
    fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700,
    color: "rgba(192,144,112,0.12)", lineHeight: 1,
  },
  cardPlan: {
    fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700,
    color: "#3b2314", marginBottom: 18, paddingRight: 60,
  },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  chip: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "#faf6f1", border: "1px solid rgba(192,144,112,0.2)",
    borderRadius: 30, padding: "7px 14px", fontSize: 13, color: "#7a4f38",
  },
  cardFooter: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    paddingTop: 18, borderTop: "1px dashed rgba(192,144,112,0.25)",
  },
  statusDot: { display: "inline-flex", alignItems: "center", fontSize: 13, fontWeight: 500, color: "#3d6b4f" },
  manageBtn: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
    color: "#e8602c", background: "rgba(232,96,44,0.08)", border: "none",
    borderRadius: 20, padding: "7px 16px", cursor: "pointer",
  },
  empty: { textAlign: "center", padding: "60px 20px" },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#3b2314", marginBottom: 8 },
  emptyText: { fontSize: 14, color: "#c09070", marginBottom: 24 },
  emptyBtn: {
    background: "#e8602c", color: "#fff", fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, fontWeight: 500, padding: "12px 28px", borderRadius: 30, border: "none", cursor: "pointer",
  },
};

export default MySubscription;