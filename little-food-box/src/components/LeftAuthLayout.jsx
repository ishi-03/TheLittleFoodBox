import React from "react";

function LeftAuthLayout({
  image = "/login.png",
  tagline = "Good Food,",
  heading = "little box of",
  highlight = "happiness",
}) {
  return (
    <div className="relative hidden md:block w-[48%] overflow-hidden">

      <div
        className="w-full h-full"
        style={{
          clipPath: "inset(0 0 0 0 round 0 140px 0 0)",
        }}
      >
        <img
          src={image}
          alt="food"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="absolute top-14 left-[10%] z-10 text-[#2f3e2f]">
        <p className="text-[11px] tracking-[6px] uppercase opacity-70 mb-1">
          {tagline}
        </p>

        <h1 className="flex items-center gap-2 text-[32px] font-normal">
          {heading}
          <svg width="20" height="18" viewBox="0 0 20 18">
            <path
              d="M10 16.5C10 16.5 1 11 1 5.5C1 3 3 1.5 5.5 2.5C7.5 3.3 10 6 10 6C10 6 12.5 3.3 14.5 2.5C17 1.5 19 3 19 5.5C19 11 10 16.5 10 16.5Z"
              stroke="#2f3e2f"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </h1>

<h1 
  className="text-[54px] font-semibold text-[#4e6b4e]"
  style={{
    fontFamily: "'Dancing Script', cursive",
    marginTop: "-14px",marginLeft: "35px" // 👈 thoda upar
  }}
>          {highlight}
        </h1>
      </div>
    </div>
  );
}

export default LeftAuthLayout;