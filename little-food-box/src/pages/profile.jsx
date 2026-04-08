import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // ✅ instead of window.location
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "400px",
      margin: "auto",
      marginTop: "100px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Plan:</b> Monthly</p>
      <p><b>Status:</b> Active</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "8px"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;