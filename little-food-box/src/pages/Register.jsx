import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";
import LeftAuthLayout from "../components/LeftAuthLayout";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const res = await fetch("https://thelittlefoodbox-2.onrender.com/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password, 
        confirmPassword: form.confirmPassword,

    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("user", JSON.stringify(data));
  navigate("/subscription");
};

  return (
    <div className="h-screen w-full flex overflow-hidden" style={{ background: "#e9dfd2" }}>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 text-xl cursor-pointer text-[#6b3f23] hover:text-[#b5572a]"
      >
        ←
      </button>

      {/* LEFT SIDE */}
      <LeftAuthLayout />

      {/* RIGHT SIDE (same as login) */}
      <div className="relative flex-1 flex items-center justify-center" style={{ padding: 24 }}>

        <div className="absolute inset-5 bg-[#f6efe7] rounded-[36px] shadow-lg" />

        <div className="relative w-full z-10" style={{ maxWidth: 380, padding: "0 20px" }}>

          {/* HEADING */}
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, textAlign: "center", color: "#2f3e2f" }}>
            Create Account
          </h2>

          <p style={{ textAlign: "center", fontSize: 13, color: "#6f7f6f", marginBottom: 22 }}>
            Start your delicious journey 🍃
          </p>

          {/* NAME */}
          <label style={{ fontSize: 11, color: "#6f7f6f" }}>Full Name</label>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd6cc", borderRadius: 999, padding: "11px 18px", background: "#faf7f2", marginBottom: 14 }}>
            <input
              name="name"
              placeholder="Your name"
              onChange={handleChange}
              style={{ border: "none", background: "transparent", outline: "none", width: "100%" }}
            />
          </div>

          {/* EMAIL */}
          <label style={{ fontSize: 11, color: "#6f7f6f" }}>Email</label>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd6cc", borderRadius: 999, padding: "11px 18px", background: "#faf7f2", marginBottom: 14 }}>
            <Mail size={16} />
            <input
              name="email"
              placeholder="youremail@example.com"
              onChange={handleChange}
              style={{ border: "none", background: "transparent", outline: "none", marginLeft: 10, width: "100%" }}
            />
          </div>

          {/* PASSWORD */}
          <label style={{ fontSize: 11, color: "#6f7f6f" }}>Password</label>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd6cc", borderRadius: 999, padding: "11px 18px", background: "#faf7f2", marginBottom: 14 }}>
            <Lock size={16} />
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              style={{ border: "none", background: "transparent", outline: "none", marginLeft: 10, width: "100%" }}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <label style={{ fontSize: 11, color: "#6f7f6f" }}>Confirm Password</label>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd6cc", borderRadius: 999, padding: "11px 18px", background: "#faf7f2", marginBottom: 18 }}>
            <Lock size={16} />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
              style={{ border: "none", background: "transparent", outline: "none", marginLeft: 10, width: "100%" }}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 999,
              background: "linear-gradient(to right, #5c704f, #4e6b4e, #2f3e2f)",
              color: "white",
              fontWeight: 600
            }}
          >
            REGISTER →
          </button>

          {/* LOGIN LINK */}
          <p style={{ textAlign: "center", marginTop: 18 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#4e6b4e", textDecoration: "underline" }}>
              Login →
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;