// import Nav from "../components/Nav";

const features = [
  {
    title: "Freshly Prepared",
    desc: "Every dish made to order on the day of your celebration, never pre-packaged.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Elegant Presentation",
    desc: "Styled by hand with linen, foliage and ceramics for an editorial finish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M4 18h16M6 18V9a6 6 0 0 1 12 0v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Fully Customisable",
    desc: "Menus shaped around your guests, your theme and your dietary needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Perfect for Every Celebration",
    desc: "From intimate kitty parties to weddings for two hundred guests.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M12 21s-7-4.5-9.3-9C1.2 8.5 3 5 6.5 5c2 0 3.4 1.2 4.5 2.7C12.1 6.2 13.5 5 15.5 5 19 5 20.8 8.5 21.3 12 19 16.5 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const included = [
  { title: "Premium Presentation", desc: "Curated styling with props, drapery and seasonal foliage." },
  { title: "Homemade Food", desc: "Small-batch cooking, never mass-produced or outsourced." },
  { title: "Elegant Styling", desc: "A palette and layout designed around your event's mood." },
  { title: "Fresh Ingredients", desc: "Sourced close to the event date for peak flavour." },
  { title: "Live Customisation", desc: "On-site tasting notes and adjustments where needed." },
];

const menu = {
  eyebrow: "Signature Menu",
  title: "Bites to Start",
  items: [
    "Tarts (Mexican / Vada Pav Mousse)",
    "Sabudana Bites with Thecha",
    "Lebanese Boats",
    "Lebanese Shots",
    "Burrito Cups",
    "Mini Samosas",
    "Kung Pao Lotus Stem Cones",
    "Taco (Classic Bean & Corn / Sweet Potato & Avocado)",
    "Coin Pizzas",
    "Tea Time Sandwich Cake",
    "Truffle Galouti Sliders",
    "Pav Bhaji Cups",
    "Tikkis (Broccoli & Cheese / Sweet Potato & Beetroot / Paneer & Veggies)",
    "Sweet Corn Cups",
    "Cheesy Pesto Garlic Bread",
    "Bean & Corn Quesadillas",
    "Dips & Cream Cheese Platter",
    "Mini Bao Buns",
    "Corn Cheese Balls",
  ],
};

const perfectFor = [
  "Corporate Events",
  "Birthdays",
  "Baby Showers",
  "Kitty Parties",
  "Engagements",
  "Weddings",
  "House Parties",
  "Brunches",
  "Festive Celebrations",
];

const gallery = [
  { src: "/grazing-1.jpg", h: "h-72" },
  { src: "/grazing-2.jpg", h: "h-96" },
  { src: "/grazing-3.jpg", h: "h-80" },
  { src: "/grazing-4.jpg", h: "h-64" },
];

const process = [
  { step: "Enquire", desc: "Reach out with your date, guest count and vision." },
  { step: "Menu Discussion", desc: "We shape a menu around your taste and occasion." },
  { step: "Customization", desc: "Styling, colours and props tailored to your theme." },
  { step: "Setup", desc: "Our team arrives early to style the table on-site." },
  { step: "Celebrate", desc: "You host, we handle the table from start to finish." },
];

const WHATSAPP = "https://wa.me/919998722140?text=Hi%20I%20would%20like%20to%20enquire%20about%20Grazing%20Tables";
const PHONE = "tel:+919998722140";

export default function GrazingTables() {
  return (
    <>
      <Nav />

      <main className="min-h-screen bg-[#FFFDF9] text-[#2A1A0E] overflow-x-hidden">
        {/* 1. Hero */}
        <section className="relative">
          <div className="pointer-events-none absolute -top-32 -left-40 w-[32rem] h-[32rem] rounded-full bg-[#B5451B]/10 blur-3xl" />
          <div className="pointer-events-none absolute top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#FBF6ED] blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20 grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-[#B5451B] mb-6 font-medium">
                The Little Food Box
              </p>
              <h1 className="font-serif text-6xl md:text-7xl leading-[1.05] mb-6">
                Grazing
                <br />
                Tables
              </h1>
              <p className="max-w-md text-[#2A1A0E]/70 leading-8 text-lg mb-10">
                A hand-styled spread of homemade bites, arranged like a still
                life — built for the moments your guests linger, graze and
                gather around.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#B5451B] text-[#FFFDF9] px-8 py-4 rounded-full text-sm tracking-wide font-medium shadow-[0_8px_30px_rgba(181,69,27,0.35)] hover:shadow-[0_12px_40px_rgba(181,69,27,0.45)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Enquire on WhatsApp
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(42,26,14,0.18)] aspect-[4/5]">
                <img
                  src="/grazing-hero.png"
                  alt="Grazing table spread"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#FBF6ED] rounded-2xl px-6 py-5 shadow-[0_20px_50px_rgba(42,26,14,0.12)] hidden md:block">
                <p className="font-serif text-2xl">19+</p>
                <p className="text-xs uppercase tracking-widest text-[#2A1A0E]/60 mt-1">
                  Signature Bites
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Why Choose */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-[#B5451B] mb-4">Why Us</p>
            <h2 className="font-serif text-4xl md:text-5xl">Why Choose Our Grazing Tables</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-[#FBF6ED] rounded-3xl p-8 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(42,26,14,0.12)] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFFDF9] text-[#B5451B] flex items-center justify-center mb-6 group-hover:bg-[#B5451B] group-hover:text-[#FFFDF9] transition-colors duration-500">
                  {f.icon}
                </div>
                <h3 className="font-serif text-xl mb-3">{f.title}</h3>
                <p className="text-sm text-[#2A1A0E]/60 leading-6">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. What's Included */}
        <section className="bg-[#FBF6ED] py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-[#B5451B] mb-4">The Details</p>
                <h2 className="font-serif text-4xl md:text-5xl mb-8">What&apos;s Included</h2>
                <div className="space-y-6">
                  {included.map((item) => (
                    <div key={item.title} className="flex gap-4 items-start">
                      <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-[#B5451B] text-[#FFFDF9] flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-[#2A1A0E]/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(42,26,14,0.15)] aspect-[4/5]">
                <img src="/grazing-2.png" alt="Grazing table detail" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Signature Menu */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-[#B5451B] mb-4">{menu.eyebrow}</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">{menu.title}</h2>
            <p className="text-[#2A1A0E]/60">
              A rotating edit of our most requested bites, all made in-house.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {menu.items.map((item, i) => (
              <div
                key={item}
                className="break-inside-avoid bg-[#FBF6ED] rounded-2xl px-6 py-5 hover:bg-[#B5451B] hover:text-[#FFFDF9] transition-colors duration-400 group"
              >
                <span className="text-xs text-[#B5451B] group-hover:text-[#FFFDF9]/70 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 leading-6">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Perfect For */}
        <section className="bg-[#FBF6ED] py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <p className="uppercase tracking-[0.3em] text-xs text-[#B5451B] mb-4">Occasions</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-12">Perfect For</h2>

            <div className="flex flex-wrap justify-center gap-3">
              {perfectFor.map((tag) => (
                <span
                  key={tag}
                  className="px-6 py-3 rounded-full bg-[#FFFDF9] text-sm tracking-wide shadow-sm hover:bg-[#B5451B] hover:text-[#FFFDF9] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Premium Gallery */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-[#B5451B] mb-4">Gallery</p>
            <h2 className="font-serif text-4xl md:text-5xl">Tables We&apos;ve Styled</h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-2 gap-6 space-y-6">
            {gallery.map((g) => (
              <div
                key={g.src}
                className={`break-inside-avoid rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(42,26,14,0.12)] ${g.h}`}
              >
                <img
                  src={g.src}
                  alt="Grazing table gallery"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 7. Process */}
        <section className="bg-[#FBF6ED] py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="uppercase tracking-[0.3em] text-xs text-[#B5451B] mb-4">How It Works</p>
              <h2 className="font-serif text-4xl md:text-5xl">The Process</h2>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-[#B5451B]/20" />
              <div className="grid md:grid-cols-5 gap-10 md:gap-6">
                {process.map((p, i) => (
                  <div key={p.step} className="relative text-center md:text-left">
                    <div className="mx-auto md:mx-0 w-12 h-12 rounded-full bg-[#B5451B] text-[#FFFDF9] flex items-center justify-center font-serif text-lg mb-5 relative z-10">
                      {i + 1}
                    </div>
                    <p className="font-medium mb-2">{p.step}</p>
                    <p className="text-sm text-[#2A1A0E]/60 leading-6">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Final CTA */}
        <section className="relative py-28 md:py-32 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[#2A1A0E]" />
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B5451B]/30 blur-3xl" />

          <div className="relative max-w-3xl mx-auto px-6 text-center text-[#FFFDF9]">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Let&apos;s Create a Beautiful Grazing Experience
            </h2>
            <p className="text-[#FFFDF9]/70 mb-10 leading-7">
              Tell us your date and headcount, and we&apos;ll design a table
              your guests remember long after the last bite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#B5451B] text-[#FFFDF9] px-8 py-4 rounded-full text-sm tracking-wide font-medium hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(181,69,27,0.5)] transition-all duration-300"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={PHONE}
                className="inline-flex items-center justify-center gap-3 border border-[#FFFDF9]/30 text-[#FFFDF9] px-8 py-4 rounded-full text-sm tracking-wide font-medium hover:bg-[#FFFDF9]/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}