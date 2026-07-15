import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeSidebar = () => onClose();

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={closeSidebar}
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 w-[260px] md:w-[260px] h-screen z-50 flex flex-col box-border overflow-x-hidden transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{
          background: "#1f2937",
          color: "#fff",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        {/* Mobile Close Button */}
        <button
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-lg"
          style={{
            background: "#374151",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

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
                onClick={closeSidebar}
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
            onClick={() => {
              closeSidebar();
              logout();
            }}
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
    </>
  );
}