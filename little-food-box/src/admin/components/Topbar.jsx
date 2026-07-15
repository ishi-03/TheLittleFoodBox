import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      style={{
        height: 70,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Admin Dashboard
        </h2>

        <p
          style={{
            margin: "4px 0 0",
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          The Little Food Box
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "#166534",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontWeight: "bold",
          }}
        >
          A
        </div>

        <button
          onClick={logout}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}