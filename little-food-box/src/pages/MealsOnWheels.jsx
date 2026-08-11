import React from "react";

// ---------- Small inline icon set (no external libraries) ----------
const IconLeaf = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M4 20c8-1 13-6 14-14-8 1-13 6-14 14Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M5 19c3.5-4 6.5-7 12-11" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconHome = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M4 11.5 12 4l8 7.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCrate = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M4 8h16l-1.5 11a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1L4 8Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M2 8h20M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 12v5M15 12v5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconScooter = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M6 18h6l1.5-6H17M13.5 12l-1-4H9M17 6h2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M18 15.8V13a2 2 0 0 0-2-2h-1" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const IconCheck = (props) => (
  <svg viewBox="0 0 20 20" fill="none" className={props.className}>
    <path
      d="M4 10.5 8 14l8-8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTwig = (props) => (
  <svg viewBox="0 0 60 12" fill="none" className={props.className}>
    <path d="M0 6h24" stroke="currentColor" strokeWidth="1" />
    <path d="M36 6h24" stroke="currentColor" strokeWidth="1" />
    <path
      d="M30 6c-2-3-6-3-7 0 1 3 5 3 7 0Zm0 0c2-3 6-3 7 0-1 3-5 3-7 0Z"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

// ---------- Data ----------
const features = [
  {
    icon: IconLeaf,
    title: "Freshly Prepared Daily",
    text: "Every tray is cooked the morning it ships — nothing sits, nothing is reheated.",
  },
  {
    icon: IconHome,
    title: "Homemade Recipes",
    text: "Family recipes made in small batches, the way it's done in a home kitchen, not a factory line.",
  },
  {
    icon: IconCrate,
    title: "Bulk Orders Available",
    text: "From a dozen to a few hundred — our kitchen scales for offices, weddings and celebrations.",
  },
  {
    icon: IconScooter,
    title: "Delivered Fresh",
    text: "Temperature-safe packaging and timed delivery windows so it arrives just as it should taste.",
  },
];

const menu = [
  {
    title: "Classic Indian",
    items: [
      "DIY Dal Pakwan",
      "Mini Podi Idli with Chutney",
      "Smoked Missal Pav",
      "Chole Kulcha Pockets",
      "Baked Vada Pav Bombs",
      "Baked Cheese Chilli Buns",
      "Chole Samosa",
      "Kolkata Style Club Kachori",
    ],
  },
  {
    title: "Gujarati Snacks",
    items: ["Dhokla", "Fafda", "Gathiya", "Jalebi", "Khandvi", "Patra", "Khasta Kachori"],
  },
  {
    title: "English Breakfast",
    items: [
      "Croissants — Cheese & Thecha, Plain Cheese, Butter Croissant, Nutella Croissant, Butter & Marmalade",
      "Assorted Cold Sandwiches",
      "Breakfast Muffins",
      "Assorted Cookie Tray",
    ],
  },
  {
    title: "Healthy Breakfast Ideas",
    items: [
      "Classic Hummus Toast",
      "Classic Avocado Toast",
      "Paneer Avocado Toast",
      "Sprouts Salad Jars",
    ],
  },
];

const occasions = [
  "Corporate Meetings",
  "Office Breakfasts",
  "Birthday Celebrations",
  "Family Gatherings",
  "Events & Catering",
  "Weekend Brunches",
];

export default function MealsOnWheels() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2A1A0E]">
      

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1100px 500px at 85% -10%, rgba(181,69,27,0.10), transparent 60%), radial-gradient(700px 400px at -10% 110%, rgba(181,69,27,0.06), transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24 grid md:grid-cols-2 gap-12 md:gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-medium text-[#B5451B] mb-5">
              Fresh &bull; Homemade &bull; Delivered
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6">
              Meals on
              <br />
              <span className="italic text-[#B5451B]">Wheels</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#2A1A0E]/75 max-w-md mb-8">
              Enjoy freshly prepared homemade meals delivered straight to your
              doorstep. Crafted using quality ingredients, balanced nutrition
              and authentic flavours for homes, offices and special occasions.
            </p>
            <a
href="https://wa.me/919998722140?text=Hi%20I%20would%20like%20to%20get%20a%20quotation%20for%20Meals%20on%20Wheels"
target="_blank"
rel="noopener noreferrer"              className="inline-flex items-center gap-2 rounded-full bg-[#B5451B] text-[#FFFDF9] px-8 py-3.5 text-sm font-medium tracking-wide shadow-[0_10px_30px_-10px_rgba(181,69,27,0.55)] hover:bg-[#963a17] hover:shadow-[0_14px_36px_-8px_rgba(181,69,27,0.6)] transition-all duration-300"
            >
              Get a Quotation
            </a>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-25px_rgba(42,26,14,0.25)] border border-[#2A1A0E]/5">
              <img
                src="/hero-breakfast.png"
                alt="Freshly prepared homemade breakfast spread"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:flex h-24 w-24 rounded-full bg-[#FFFDF9] shadow-[0_15px_35px_-10px_rgba(42,26,14,0.25)] items-center justify-center border border-[#2A1A0E]/5">
              <IconTwig className="w-14 h-3 text-[#B5451B]" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Why Choose Us ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.25em] text-xs text-[#B5451B] mb-3">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Care in every tray we send
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-3xl bg-[#FBF6ED] border border-[#2A1A0E]/5 p-7 shadow-[0_10px_25px_-15px_rgba(42,26,14,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(181,69,27,0.25)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#B5451B]/10 flex items-center justify-center mb-5 group-hover:bg-[#B5451B]/15 transition-colors">
                <Icon className="w-6 h-6 text-[#B5451B]" />
              </div>
              <h3 className="font-serif text-lg mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-[#2A1A0E]/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Breakfast Collection ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.25em] text-xs text-[#B5451B] mb-3">
            The Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Breakfast, done properly
          </h2>
          <p className="text-sm md:text-base text-[#2A1A0E]/60 max-w-xl mx-auto">
            A menu built across four traditions — pick a category, or mix
            across all of them for your next order.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {menu.map((cat) => (
            <div
              key={cat.title}
              className="rounded-3xl bg-[#FBF6ED] border border-[#2A1A0E]/5 p-8 md:p-9 shadow-[0_10px_25px_-15px_rgba(42,26,14,0.15)] hover:shadow-[0_18px_35px_-15px_rgba(181,69,27,0.2)] transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-serif text-2xl">{cat.title}</h3>
                <div className="flex-1 h-px bg-[#2A1A0E]/10" />
              </div>
              <ul className="space-y-3.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#B5451B]/10 flex items-center justify-center shrink-0">
                      <IconCheck className="w-3 h-3 text-[#B5451B]" />
                    </span>
                    <span className="text-sm md:text-[15px] leading-relaxed text-[#2A1A0E]/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Premium Gallery ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.25em] text-xs text-[#B5451B] mb-3">
            Gallery
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">A taste of the table</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 [&>*:nth-child(1)]:row-span-2 [&>*:nth-child(4)]:row-span-2">
          {[
            { ratio: "aspect-[3/4]", src: "/gallery-1.jpeg" },
            { ratio: "aspect-square", src: "/gallery-2.jpeg" },
            { ratio: "aspect-square", src: "/gallery-3.jpeg" },
            // { ratio: "aspect-[3/4]", src: "/images/gallery-4.jpg" },
            // { ratio: "aspect-square", src: "/images/gallery-5.jpg" },
            // { ratio: "aspect-square", src: "/images/gallery-6.jpg" },
          ].map(({ ratio, src }, i) => (
            <div
              key={i}
              className={`${ratio} rounded-3xl overflow-hidden border border-[#2A1A0E]/5 shadow-[0_10px_25px_-15px_rgba(42,26,14,0.2)] hover:shadow-[0_18px_35px_-12px_rgba(181,69,27,0.2)] transition-shadow duration-300`}
            >
              <img
                src={src}
                alt="Homemade breakfast dish"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#2A1A0E] to-[#3A2416] text-[#FFFDF9] px-8 md:px-16 py-14 md:py-20 text-center shadow-[0_30px_60px_-25px_rgba(42,26,14,0.4)]">
          <p className="uppercase tracking-[0.25em] text-xs text-[#B5451B]/90 mb-4">
            Pricing
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Every order, tailored to you
          </h2>
          <p className="text-sm md:text-base text-[#FFFDF9]/70 max-w-xl mx-auto mb-3 leading-relaxed">
            Every order is customized based on quantity, menu selection and
            requirements.
          </p>
          <p className="text-sm md:text-base text-[#FFFDF9]/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Instead of displaying fixed pricing, please contact us for a
            personalised quotation.
          </p>
          <a
href="https://wa.me/919998722140?text=Hi%20I%20would%20like%20to%20get%20a%20quotation%20for%20Meals%20on%20Wheels"
target="_blank"
rel="noopener noreferrer"            className="inline-flex items-center gap-2 rounded-full bg-[#B5451B] text-[#FFFDF9] px-9 py-3.5 text-sm font-medium tracking-wide hover:bg-[#c85428] transition-colors duration-300"
          >
            Contact for Pricing
          </a>
        </div>
      </section>

      {/* ---------------- Bulk Orders / Perfect For ---------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="rounded-[2.5rem] bg-[#FBF6ED] border border-[#2A1A0E]/5 px-8 md:px-14 py-14 md:py-16 shadow-[0_10px_30px_-15px_rgba(42,26,14,0.15)]">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-xs text-[#B5451B] mb-3">
              Perfect For
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Wherever people gather
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {occasions.map((occasion) => (
              <span
                key={occasion}
                className="rounded-full bg-[#FFFDF9] border border-[#2A1A0E]/10 px-6 py-3 text-sm md:text-[15px] font-medium shadow-sm hover:border-[#B5451B]/40 hover:text-[#B5451B] hover:-translate-y-0.5 transition-all duration-300"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#B5451B] px-8 md:px-16 py-16 md:py-20 text-center text-[#FFFDF9] shadow-[0_30px_60px_-25px_rgba(181,69,27,0.5)]">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background:
                "radial-gradient(600px 300px at 10% 0%, #fff, transparent 60%), radial-gradient(600px 300px at 90% 100%, #fff, transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
              Let&rsquo;s Plan Your Next Breakfast
            </h2>
            <p className="text-sm md:text-base text-[#FFFDF9]/85 max-w-xl mx-auto mb-9 leading-relaxed">
              From intimate gatherings to large corporate breakfasts,
              we&rsquo;ll prepare a menu your guests will love.
            </p>
            <a
href="https://wa.me/919998722140"
target="_blank"
rel="noopener noreferrer"              className="inline-flex items-center gap-2 rounded-full bg-[#FFFDF9] text-[#B5451B] px-9 py-3.5 text-sm font-medium tracking-wide hover:bg-[#FFF6E9] hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}