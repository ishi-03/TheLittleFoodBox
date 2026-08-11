import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/admin",
    },
    {
      name: "Users",
      icon: "👥",
      path: "/admin/users",
    },
    {
      name: "Subscriptions",
      icon: "📦",
      path: "/admin/subscriptions",
    },
    {
      name: "Subscription Plans",
      icon: "💳",
      path: "/admin/subscription-plans",
    },
    {
      name: "Salads",
      icon: "🥗",
      path: "/admin/salads",
    },
    {
      name: "Menu Items",
      icon: "🍽️",
      path: "/admin/menu-items",
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      {/* Mobile Backdrop */}
      <div
        onClick={closeSidebar}
        className={`md:hidden fixed inset-0 bg-[#2a1a0e]/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 w-[260px] md:w-[260px] h-screen z-50 flex flex-col box-border overflow-x-hidden overflow-y-auto transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#fdf8f3] to-[#eef1e7] border-r border-[#e0d5c5] p-5 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-lg bg-white/70 text-[#6b5440] border border-[#e0d5c5] cursor-pointer hover:bg-white transition-colors"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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

        {/* Brand */}
        <div className="mb-8 text-center pt-1">
          <div
            className="text-[1.4rem] font-bold text-[#2a1a0e] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            🥗 Admin Panel
          </div>
          <div
            className="text-[9.5px] tracking-[0.14em] uppercase text-[#9a7d65] mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            The Little Food Box
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {menus.map((menu) => {
            const active = pathname === menu.path;

            return (
              <Link
                key={menu.path}
                to={menu.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-[10px] text-sm no-underline transition-all duration-200 ${
                  active
                    ? "bg-[#2a1a0e] text-[#f5f0e8] font-semibold shadow-sm"
                    : "text-[#5a4636] font-normal hover:bg-white/70 hover:text-[#b5451b]"
                }`}
              >
                <span className="text-base leading-none">{menu.icon}</span>
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div
          className="pt-5 border-t border-[#e0d5c5]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a
            href="/menucard"
            className="flex items-center justify-center gap-2 mb-2.5 px-4 py-3 rounded-[10px] no-underline text-sm font-medium text-[#6b5440] bg-white/70 border border-[#e0d5c5] hover:border-[#c9b49a] hover:text-[#b5451b] transition-colors"
          >
            🌐 View Website
          </a>

          <button
            onClick={() => {
              closeSidebar();
              logout();
            }}
            className="w-full px-4 py-3 rounded-[10px] border border-[#f0cdb8] bg-[#fdf3ec] text-[#8b3a1f] text-sm font-semibold cursor-pointer hover:bg-[#b5451b] hover:text-white hover:border-[#b5451b] transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}