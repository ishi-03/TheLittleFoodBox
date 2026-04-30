import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await fetch("https://thelittlefoodbox.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data._id) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/subscription");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden" style={{ background: "#e9dfd2" }}>

      {/* ───── LEFT SIDE ───── */}
      <div className="relative hidden md:block" style={{ width: "48%", flexShrink: 0, overflow: "hidden" }}>

        {/*
          The image shows an ARCH shape:
          - Top-left corner: sharp (square)
          - Top-right corner: large rounded curve (the arch)
          - Bottom-left: sharp
          - Bottom-right: sharp
          
          We achieve this with border-radius on only the top-right corner,
          combined with overflow:hidden on the parent.
          
          The inward curve at top-right means the image itself is clipped
          with a concave notch — like the right panel overlaps into the left.
          We use an SVG clip-path for a true concave curve.
        */}
        <div
          className="w-full h-full"
          style={{
            clipPath: "inset(0 0 0 0 round 0 140px 0 0)",
          }}
        >
          <img
            src="/login.png"
            alt="food"
            className="w-full h-full object-cover"
          />
        </div>

      {/* Top-left text */}
<div className="absolute top-14 left-40 z-10" style={{ color: "#2f3e2f" }}>
  <p style={{ 
    fontSize: 11, letterSpacing: 6, textTransform: "uppercase", 
    fontWeight: 500, opacity: 0.75, marginBottom: 6, fontFamily: "inherit" 
  }}>
    Good Food,
  </p>
  <h1 style={{ 
    fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, 
    lineHeight: 1.2, marginBottom: 2, color: "#2f3e2f", display: "flex", alignItems: "center", gap: 10
  }}>
    little box of
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 4 }}>
      <path d="M10 16.5C10 16.5 1 11 1 5.5C1 3 3 1.5 5.5 2.5C7.5 3.3 10 6 10 6C10 6 12.5 3.3 14.5 2.5C17 1.5 19 3 19 5.5C19 11 10 16.5 10 16.5Z" 
        stroke="#2f3e2f" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </h1>
  <h1 style={{ 
    fontFamily: "'Dancing Script', cursive", fontSize: 54, fontStyle: "italic", fontWeight: 600, 
    lineHeight: 1.1, color: "#4e6b4e", marginTop: -4
  }}>
    happiness
  </h1>
</div>

       
      </div>

      {/* ───── RIGHT SIDE ───── */}
      <div className="relative flex-1 flex items-center justify-center" style={{ padding: 24 }}>

        {/* Background panel */}
        <div
          className="absolute inset-5"
          style={{
            background: "#f6efe7",
            borderRadius: 36,
            boxShadow: "0 10px 50px rgba(0,0,0,0.07)",
          }}
        />

        {/* Form */}
        <div className="relative w-full z-10" style={{ maxWidth: 380, padding: "0 20px" }}>

          {/* LOGO */}
       {/* LOGO */}
<div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
  <div
    style={{
      position: "relative",
      border: "1px solid #b5a99a",
      borderRadius: 4,
      padding: "14px 36px 10px",
      textAlign: "center",
      display: "inline-block",
      minWidth: 130,
    }}
  >
    {/* Leaf SVG — top right, overlapping the border */}
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: -22, right: -14 }}
    >
      {/* Main stem */}
      <line x1="24" y1="44" x2="24" y2="16" stroke="#3a3a3a" strokeWidth="1" strokeLinecap="round"/>
      {/* Left large leaf */}
      <path d="M24 28 C18 22 10 20 12 12 C16 14 22 20 24 28Z" fill="#3a3a3a"/>
      {/* Right large leaf */}
      <path d="M24 22 C30 16 38 14 36 6 C32 8 26 14 24 22Z" fill="#3a3a3a"/>
      {/* Small left leaf */}
      <path d="M24 36 C20 32 15 32 16 26 C19 27 23 31 24 36Z" fill="#3a3a3a"/>
    </svg>

    <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#3a3a3a", fontWeight: 500 }}>THE</div>
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: "#2a2a2a", lineHeight: 1.15 }}>
      little Food
    </div>
    <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#3a3a3a", fontWeight: 500, marginBottom: 6 }}>BOX</div>
    {/* Heart */}
   {/* Heart */}
<div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 11C7 11 1 7 1 3.5C1 2 2.5 1 4 1.5C5.5 2 7 4 7 4C7 4 8.5 2 10 1.5C11.5 1 13 2 13 3.5C13 7 7 11 7 11Z" stroke="#3a3a3a" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>
  </div>
</div>

          {/* HEADING */}
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 500, textAlign: "center", color: "#2f3e2f", marginBottom: 6 }}>
            Welcome Back!
          </h2>
          <p style={{ fontSize: 13, textAlign: "center", color: "#6f7f6f", marginBottom: 22 }}>
            Login to continue your delicious journey 🍃
          </p>

          {/* EMAIL */}
          <label style={{ fontSize: 11, color: "#6f7f6f", fontWeight: 500, marginBottom: 5, display: "block" }}>Email Address</label>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd6cc", borderRadius: 999, padding: "11px 18px", background: "#faf7f2", marginBottom: 14 }}>
            <Mail size={16} color="#9a9a9a" />
            <input
              name="email"
              placeholder="youremail@example.com"
              onChange={handleChange}
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, marginLeft: 10, width: "100%", fontFamily: "inherit", color: "#3a3a3a" }}
            />
          </div>

          {/* PASSWORD */}
          <label style={{ fontSize: 11, color: "#6f7f6f", fontWeight: 500, marginBottom: 5, display: "block" }}>Password</label>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd6cc", borderRadius: 999, padding: "11px 18px", background: "#faf7f2", marginBottom: 8 }}>
            <Lock size={16} color="#9a9a9a" />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, marginLeft: 10, width: "100%", fontFamily: "inherit", color: "#3a3a3a" }}
            />
            <Eye size={16} color="#9a9a9a" style={{ cursor: "pointer", flexShrink: 0 }} />
          </div>

          <p style={{ textAlign: "right", fontSize: 11.5, color: "#7a8a7a", marginBottom: 18, cursor: "pointer" }}>
            Forgot Password?
          </p>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "14px", borderRadius: 999, border: "none",
              background: "linear-gradient(to right, #5c704f, #4e6b4e, #2f3e2f)",
              color: "white", fontSize: 13, letterSpacing: 3, fontWeight: 600,
              cursor: "pointer", boxShadow: "0 4px 18px rgba(50,80,50,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontFamily: "inherit", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
          >
            LOGIN
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#ddd" }} />
            <span style={{ fontSize: 11, color: "#999", whiteSpace: "nowrap" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "#ddd" }} />
          </div>

          {/* SOCIAL BUTTONS */}
          <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            <button
              style={{ flex: 1, border: "1.5px solid #ccc", borderRadius: 999, padding: "10px", background: "transparent", cursor: "pointer", fontSize: 13, fontFamily: "inherit", color: "#444", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3eee6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              style={{ flex: 1, border: "1.5px solid #ccc", borderRadius: 999, padding: "10px", background: "transparent", cursor: "pointer", fontSize: 13, fontFamily: "inherit", color: "#444", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3eee6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>

          {/* SIGNUP */}
          <p style={{ textAlign: "center", fontSize: 13, color: "#6f7f6f" }}>
            New here?{" "}
            <span style={{ color: "#4e6b4e", fontWeight: 500, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}>
              Create an account →
            </span>
          </p>
        </div>

        {/* FOOTER */}
        <p
          className="hidden md:flex"
          style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            fontSize: 11, color: "#7a8a7a", whiteSpace: "nowrap",
            alignItems: "center", gap: 8, zIndex: 1,
          }}
        >
          <span style={{ fontSize: 14, opacity: 0.5 }}>🌿</span>
          Good food is the ingredient that brings us together.
          <span style={{ fontSize: 14, opacity: 0.5 }}>🌿</span>
        </p>
      </div>
    </div>
  );
};

export default Login;