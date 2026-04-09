import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LEFT_LINKS = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const RIGHT_LINKS = [
  { name: "Menu", to: "/menu" },
  { name: "Subscription", to: "/subscription" },
  { name: "My Plan", to: "/my-subscription" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleStorage = () => setUser(JSON.parse(localStorage.getItem("user")));

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-8 transition-all duration-300
        bg-white/80 backdrop-blur-md border-b border-[#0f5f33]/10
        ${scrolled ? "h-14 shadow-sm" : "h-[72px]"}
      `}
    >
      {/* Left links */}
      <nav className="flex items-center gap-1">
        {LEFT_LINKS.map((link) => (
          <NavLink key={link.name} to={link.to}>
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Center logo */}
      <Link
  to="/"
  className={`
    absolute left-1/2 -translate-x-1/2
    top-full
    flex flex-col items-center
    transition-all duration-300
    ${scrolled ? "translate-y-[-40%] scale-90" : "translate-y-[-50%] scale-100"}
  `}
>
        <img
          src="/TLBLogo.png"
          alt="Logo"
          className={`object-contain transition-all duration-300 ${scrolled ? "h-50 w-50" : "h-62 w-62"}`}
        />
      </Link>

      {/* Right links */}
      <nav className="flex items-center gap-1">
        {RIGHT_LINKS.map((link) => (
          <NavLink key={link.name} to={link.to}>
            {link.name}
          </NavLink>
        ))}

        {/* Divider */}
        <span className="w-px h-4 bg-[#0f5f33]/20 mx-2" />

        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm font-medium tracking-wide text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="
        px-3 py-1.5 rounded-lg
        text-sm font-medium tracking-wide text-[#1a6e3c]
        hover:bg-[#0f5f33]/8 hover:text-[#0f5f33]
        transition-colors duration-150
      "
    >
      {children}
    </Link>
  );
}