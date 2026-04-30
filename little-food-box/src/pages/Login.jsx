import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
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
  {/* BACK BUTTON */}
  <button
    onClick={() => navigate(-1)}
    className="absolute top-6 left-6 z-50 text-xl cursor-pointer text-[#6b3f23] hover:text-[#b5572a] transition"
  >
    ←
  </button>
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
            Welcome !
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


          {/* SIGNUP */}
          <p style={{ textAlign: "center", fontSize: 13, color: "#6f7f6f" }}>
            New here?{" "}
           <Link
  to="/register"
  style={{
    color: "#4e6b4e",
    fontWeight: 500,
    textDecoration: "underline",
    textUnderlineOffset: 2
  }}
>
  Create an account →
</Link>
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