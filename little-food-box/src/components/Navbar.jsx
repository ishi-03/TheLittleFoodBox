import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);

    // update user when localStorage changes
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // ✅ no reload
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="relative w-full">
          <svg
            width="100%"
            height="100"
            viewBox="0 0 1400 100"
            preserveAspectRatio="none"
            className="w-full"
          >
            <path
              d="
                M 0 0
                L 0 100
                L 540 100
                Q 565 100 580 85
                Q 595 70 610 55
                L 630 30
                Q 650 10 675 10
                L 725 10
                Q 750 10 770 30
                L 790 55
                Q 805 70 820 85
                Q 835 100 860 100
                L 1400 100
                L 1400 0
                Z
              "
              fill="rgba(255,255,255,0.25)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
            />
          </svg>

          {/* CONTENT */}
          <div className="absolute top-0 left-0 right-0 h-[100px] flex items-center justify-between px-16 pt-12">

            {/* LEFT LINKS */}
            <div className="flex gap-18 text-base tracking-wide">
              {[
                { name: "HOME", to: "/" },
                { name: "ABOUT", to: "/about" },
                { name: "CONTACT", to: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="relative px-4 py-2 group rounded-lg"
                >
                  <span className="absolute inset-0 bg-[#0f5f33]/15 opacity-0 group-hover:opacity-100 transition rounded-lg"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1fa85b] group-hover:w-full transition"></span>
                  <span className="relative font-semibold text-[#0f5f33]">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* LOGO */}
            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${scrolled ? "-top-2" : "-top-6"}`}>
              <img
                src="/TLBLogo.png"
                alt="Logo"
                className={`drop-shadow-xl transition-all duration-500 ${scrolled ? "h-50 w-50" : "h-100 w-100"}`}
              />
            </div>

            {/* RIGHT LINKS */}
            <div className="flex gap-18 text-base tracking-wide">

              {[
                { name: "MENU", to: "/menu" },
                { name: "SUBSCRIPTION", to: "/subscription" },
                { name: "MY PLAN", to: "/my-subscription" },

                ...(user
                  ? [
                      { name: "PROFILE", to: "/profile" },
                      { name: "LOGOUT", action: "logout" }
                    ]
                  : [
                      { name: "LOGIN", to: "/login" },
                      { name: "REGISTER", to: "/register" }
                    ])
              ].map((item) => (

                item.action === "logout" ? (
                  <button
                    key="logout"
                    onClick={handleLogout}
                    className="relative px-4 py-2 font-semibold text-red-500 hover:text-red-700"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="relative px-4 py-2 group rounded-lg"
                  >
                    <span className="absolute inset-0 bg-[#0f5f33]/15 opacity-0 group-hover:opacity-100 transition rounded-lg"></span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1fa85b] group-hover:w-full transition"></span>
                    <span className="relative font-semibold text-[#0f5f33]">
                      {item.name}
                    </span>
                  </Link>
                )
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}