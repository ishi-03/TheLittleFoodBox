import { useState } from "react";
const Field = ({ id, label, type = "text", textarea, form, setForm, focused, setFocused }) => {
  const val = form[id];
  const isFocused = focused === id;
  const active = isFocused || val.length > 0;

  const base = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${isFocused ? "#b5451b" : "#c9b49a"}`,
    outline: "none",
    paddingTop: "22px",
    paddingBottom: "8px",
    paddingLeft: 0,
    paddingRight: 0,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    color: "#2a1a0e",
    resize: "none",
    transition: "border-color 0.25s",
  };

  return (
    <div style={{ position: "relative", marginBottom: "2.2rem" }}>
      <label
        style={{
          position: "absolute",
          left: 0,
          top: active ? "0px" : textarea ? "22px" : "50%",
          transform: active || textarea ? "none" : "translateY(-50%)",
          fontSize: active ? "10px" : "13px",
          letterSpacing: active ? "0.12em" : "0.04em",
          textTransform: "uppercase",
          color: isFocused ? "#b5451b" : "#9a7d65",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          transition: "all 0.22s",
          pointerEvents: "none",
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={val}
          onChange={e => setForm({ ...form, [id]: e.target.value })}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          style={base}
        />
      ) : (
        <input
          type={type}
          value={val}
          onChange={e => setForm({ ...form, [id]: e.target.value })}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          style={base}
        />
      )}
    </div>
  );
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const msgSentSubmit = () => {
    if (!form.name || !form.phone) return;

    const text = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`
    );


    setSent(true);

    window.open(`https://wa.me/918236055718?text=${text}`, "_blank");

    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <>

    <div style={{
      minHeight: "100vh",
      background: "#f5f0e8",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .anim-1 { animation: fadeIn 0.6s ease forwards; }
        .anim-2 { animation: slideRight 0.7s ease 0.15s both; }
        .anim-3 { animation: fadeUp 0.7s ease 0.25s both; }
        .anim-4 { animation: fadeUp 0.7s ease 0.35s both; }

        .whatsapp-btn:hover { background: #15803d !important; color: #fff !important; }
        .submit-btn:hover { background: #8c3511 !important; }
        .submit-btn:active { transform: scale(0.98); }

        .info-item:hover .info-icon { transform: scale(1.12); }

        @media (max-width: 900px) {
          .layout { flex-direction: column !important; }
          .left-col { width: 100% !important; border-right: none !important; border-bottom: 1px solid #e0d5c5 !important; padding: 3rem 2rem !important; }
          .right-col { width: 100% !important; padding: 3rem 2rem !important; }
          .page-title { font-size: 3.2rem !important; }
        }
      `}</style>

      {/* Main content */}
      <div className="layout" style={{
        flex: 1,
        display: "flex",
        maxWidth: "1100px",
        width: "100%",
        margin: "0 auto",
        padding: "0 1rem",
      }}>

        {/* LEFT — brand info */}
        <div className="left-col anim-2" style={{
          width: "42%",
          padding: "5rem 3.5rem 5rem 1rem",
          borderRight: "1px solid #e0d5c5",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a7d65", marginBottom: "1rem" }}>
              Get in touch
            </div>
            <h1 className="page-title" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "4rem",
              fontWeight: 700,
              color: "#2a1a0e",
              lineHeight: 1.05,
              marginBottom: "1.2rem",
            }}>
              We'd love<br />to hear<br />
              <em style={{ fontWeight: 400, color: "#b5451b" }}>from you.</em>
            </h1>
            <p style={{ fontSize: "0.88rem", color: "#6b5440", lineHeight: 1.8, maxWidth: "300px" }}>
              Place an order, ask about our menu, or just drop a sweet note. Every meal made just like home.
            </p>
          </div>

          {/* Info items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            {[
              { icon: "👩‍🍳", label: "Your Host", value: "Parul Agrawal" },
              { icon: "📞", label: "Call / WhatsApp", value: "+91 82360 55718", href: "tel:+918236055718" },
              { icon: "📍", label: "Address", value: "A-102, Palak Elina, Iscon Ambli Road, Ahmedabad" },
              { icon: "🕐", label: "Order", value: "2 days prior" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="info-item" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div className="info-icon" style={{
                  fontSize: "1.3rem",
                  width: "40px",
                  height: "40px",
                  background: "#ede5d8",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "transform 0.2s",
                }}>{icon}</div>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a7d65", marginBottom: "3px" }}>{label}</div>
                  {href
                    ? <a href={href} style={{ fontSize: "0.9rem", color: "#2a1a0e", fontWeight: 500, textDecoration: "none" }}>{value}</a>
                    : <div style={{ fontSize: "0.9rem", color: "#2a1a0e", fontWeight: 500, lineHeight: 1.5 }}>{value}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["🌿 Fresh", "🏠 Home-made", "❤️ With Love", "🥗 100% Veg"].map(tag => (
              <span key={tag} style={{
                fontSize: "11px",
                padding: "5px 12px",
                background: "#ede5d8",
                borderRadius: "100px",
                color: "#6b5440",
                letterSpacing: "0.04em",
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="right-col anim-3" style={{
          width: "58%",
          padding: "5rem 1rem 5rem 3.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>

          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a7d65", marginBottom: "0.6rem" }}>
              Send a message
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.4rem",
              fontWeight: 600,
              color: "#2a1a0e",
              lineHeight: 1.1,
            }}>
Tell us what you’re <br />craving today 🍽️
            </h2>
          </div>

          <div style={{ maxWidth: "440px" }}>
            <Field id="name" label="Your Name" form={form} setForm={setForm} focused={focused} setFocused={setFocused} />
            <Field id="phone" label="Phone / WhatsApp" type="tel" form={form} setForm={setForm} focused={focused} setFocused={setFocused} />
            <Field id="message" label="Your message or order..." textarea form={form} setForm={setForm} focused={focused} setFocused={setFocused} />

            <button
              className="submit-btn"
              onClick={msgSentSubmit}
              style={{
                width: "100%",
                padding: "1rem",
                background: sent ? "#15803d" : "#b5451b",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "background 0.25s, transform 0.15s",
                marginBottom: "1.5rem",
              }}
            >
              {sent ? "✓  Message Sent!" : "Send Message →"}
            </button>

            {sent && (
              <div style={{
                animation: "popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "4px",
                padding: "12px 16px",
                fontSize: "13px",
                color: "#15803d",
                marginBottom: "1.5rem",
              }}>
                🎉 We'll get back to you shortly!
              </div>
            )}

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
              <div style={{ flex: 1, height: "1px", background: "#e0d5c5" }} />
              <span style={{ fontSize: "11px", color: "#9a7d65", letterSpacing: "0.1em", textTransform: "uppercase" }}>or reach us on</span>
              <div style={{ flex: 1, height: "1px", background: "#e0d5c5" }} />
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918236055718"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "0.85rem",
                background: "transparent",
                color: "#15803d",
                border: "1.5px solid #4ade80",
                borderRadius: "4px",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #e0d5c5",
        textAlign: "center",
        padding: "1.5rem",
        fontSize: "11px",
        color: "#9a7d65",
        letterSpacing: "0.08em",
      }}>
        © 2025 The Little Food Box · Made with 🧡 in Ahmedabad &nbsp;·&nbsp; All prices inclusive · Service with a smile 😊
      </div>
    </div>
        </>

  );
}