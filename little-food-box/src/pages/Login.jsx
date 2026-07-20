import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import LeftAuthLayout from "../components/LeftAuthLayout";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleLogin = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

console.log("LOGIN RESPONSE:", data);
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));


console.log("Saved User:", localStorage.getItem("user"));
      window.dispatchEvent(new Event("storage"));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/subscription");
      }
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
};

  return (
    <div className="h-screen w-full flex overflow-hidden" style={{ background: "#e9dfd2" }}>
  {/* BACK BUTTON */}
<button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-lg cursor-pointer text-[#6b3f23] hover:text-[#b5572a] hover:shadow-lg transition-all duration-200"
>
  ←
</button>
      {/* ───── LEFT SIDE ───── */}
      <LeftAuthLayout />

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

    
      </div>
    </div>
  );
};

export default Login;