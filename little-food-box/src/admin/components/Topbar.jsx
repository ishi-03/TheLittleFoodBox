import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      className="px-4 md:pl-[30px] md:pr-[30px]"
      style={{
        height: 70,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
          style={{
            background: "#1f2937",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Open menu"
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
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="min-w-0">
          <h2
            className="text-base md:text-[22px] truncate"
            style={{
              margin: 0,
              fontWeight: 700,
            }}
          >
            Admin Dashboard
          </h2>

          <p
            className="text-xs md:text-sm truncate"
            style={{
              margin: "4px 0 0",
              color: "#6b7280",
            }}
          >
            The Little Food Box
          </p>
        </div>
      </div>

      <div
        className="gap-2 md:gap-[15px]"
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          className="w-8 h-8 md:w-[42px] md:h-[42px] text-sm md:text-base"
          style={{
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
          className="px-3 py-2 text-sm md:px-[18px] md:py-[10px] md:text-base whitespace-nowrap"
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
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