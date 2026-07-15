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
      className="fixed top-0 left-0 w-full md:w-[260px] h-auto md:h-screen z-50 flex flex-col box-border overflow-x-hidden"
      style={{
        background: "#1f2937",
        color: "#fff",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: 35,
          textAlign: "center",
        }}
        className="text-base md:text-xl mb-4 md:mb-[35px]"
      >
        🥗 Admin Panel
      </h2>

      {/* Navigation */}
      <div className="flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible overflow-y-visible gap-2 md:gap-0 pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
        {menus.map((menu) => {
          const active = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className="block flex-shrink-0 md:flex-shrink whitespace-nowrap md:whitespace-normal mb-0 md:mb-[10px]"
              style={{
                padding: "13px 16px",
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
        className="flex flex-col gap-2 md:gap-0 mt-2 md:mt-0"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 20,
        }}
      >
        
          href="/menu"
          className="block mb-0 md:mb-0"
          style={{
            display: "block",
            textDecoration: "none",
            textAlign: "center",
            padding: "13px",
            borderRadius: 10,
            background: "#374151",
            color: "#fff",
            marginBottom: 10,
          }}
        >
          🌐 View Website
        </a>

        <button
          onClick={logout}
          className="w-full"
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