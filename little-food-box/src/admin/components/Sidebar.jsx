import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      name: "📊 Dashboard",
      path: "/admin",
    },
    {
      name: "👥 Users",
      path: "/admin/users",
    },
    {
      name: "📦 Subscriptions",
      path: "/admin/subscriptions",
    },
    {
      name: "💳 Subscription Plans",
      path: "/admin/subscription-plans",
    },
    {
      name: "🥗 Salads",
      path: "/admin/salads",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 260,
        height: "100vh",
        background: "#1f2937",
        color: "#fff",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: 35,
          textAlign: "center",
        }}
      >
        🥗 Admin Panel
      </h2>

      {/* Navigation */}
      <div style={{ flex: 1 }}>
        {menus.map((menu) => {
          const active = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              style={{
                display: "block",
                padding: "13px 16px",
                marginBottom: 10,
                borderRadius: 10,
                textDecoration: "none",
                color: "#fff",
                background: active ? "#166534" : "transparent",
                fontWeight: active ? "600" : "400",
                transition: "0.2s",
              }}
            >
              {menu.name}
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 20,
        }}
      >
        <a
  href="/menu"
  style={{
    display: "block",
    textDecoration: "none",
    textAlign: "center",
    padding: "13px",
    borderRadius: 10,
    background: "#374151",
    color: "#fff",
  }}
>
  🌐 View Website
</a>

        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: 10,
            background: "#dc2626",
            color: "#fff",
            fontSize: 15,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}