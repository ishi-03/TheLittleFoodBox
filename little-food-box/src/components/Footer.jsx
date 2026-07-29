// Fine single-stroke olive sprig — a quiet botanical mark, not an icon.
function OliveBranch({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0 10 H200" strokeOpacity="0.35" />
      <g strokeOpacity="0.8">
        <path d="M100 10 C95 5 88 5 84 10 C88 10 95 10 100 10 Z" />
        <path d="M100 10 C105 5 112 5 116 10 C112 10 105 10 100 10 Z" />
        <path d="M100 10 C95 15 88 15 84 10 C88 10 95 10 100 10 Z" />
        <path d="M100 10 C105 15 112 15 116 10 C112 10 105 10 100 10 Z" />
      </g>
      <circle cx="100" cy="10" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Botanical corner flourish — a slender stem with a few irregular,
// hand-drawn leaves, closer to a pressed-flower illustration than an icon.
function LeafMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 36 C7 24 10 14 18 5" />
      <path d="M9 28 C13 26 16 22 15 17 C10 18 7 22 9 28 Z" />
      <path d="M12 19 C16 18 19 15 18 10 C13 11 10 14 12 19 Z" />
      <path d="M15 11 C18 9 20 6 19 3 C15 4 13 7 15 11 Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Our services",
    links: [
      { label: "Salad Subscription", href: "/subscription" },
      { label: "Meals on Wheels", href: "/meals-on-wheels" },
      { label: "Grazing Tables", href: "/grazing-tables" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

function FooterLink({ label, href }) {
  return (
    <a
      href={href}
      className="relative inline-block text-[13px] text-[#f5e9d4]/65 hover:text-[#e8bfa0]
                 tracking-wide transition-colors duration-500 ease-out
                 after:content-[''] after:absolute after:left-1/2 after:-bottom-1
                 after:w-0 after:h-px after:bg-[#e8bfa0]/70
                 after:transition-all after:duration-500 after:ease-out
                 hover:after:left-0 hover:after:w-full"
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-[#2c1a0e] text-[#fdf6ec] overflow-hidden"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* ambient warmth — a faint glow rising from the center, plus a soft
          top-to-bottom gradient standing in for paper depth. No noise, no images. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(181,87,42,0.07), transparent 70%), " +
            "linear-gradient(180deg, rgba(253,246,236,0.03) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* corner flourishes, barely-there */}
      <LeafMark className="hidden sm:block absolute top-4 left-10 w-5 h-5 text-[#5a7a52]/20" />
      <LeafMark className="hidden sm:block absolute top-4 right-10 w-5 h-5 text-[#5a7a52]/20 -scale-x-100" />

      <div className="relative max-w-7xl mx-auto px-8 sm:px-16 pt-8 sm:pt-9 pb-5">

        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <h2
            className="text-3xl sm:text-[2.25rem] leading-[1.1] tracking-wide text-[#fdf6ec]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The Little Food Box
          </h2>
          <p className="mt-2 text-[12px] text-[#f5e9d4]/55 tracking-[0.03em]">
            Made fresh every morning. Packed with love. Delivered with care.
          </p>
        </div>

        {/* Ornamental divider with a small botanical mark at its center */}
        <div className="flex items-center justify-center gap-4 mt-4 mb-5">
          <span className="h-px w-16 sm:w-28 bg-[#f5e9d4]/15" />
          <OliveBranch className="w-12 h-3 text-[#b5572a]/85 shrink-0" />
          <span className="h-px w-16 sm:w-28 bg-[#f5e9d4]/15" />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 sm:gap-x-14 gap-y-6 sm:gap-y-0 text-center justify-items-center">
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-[11px] text-[#e8bfa0]/90 mb-2 tracking-[0.2em] uppercase">
                {title}
              </h3>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get in touch */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[11px] text-[#e8bfa0]/90 mb-2 tracking-[0.2em] uppercase">
              Get in touch
            </h3>
            <ul className="space-y-1.5 mb-3">
              <li>
                <a
                  href="tel:+9182360 55718"
                  className="relative inline-block text-[13px] text-[#f5e9d4]/65 hover:text-[#e8bfa0]
                             tracking-wide transition-colors duration-500 ease-out
                             after:content-[''] after:absolute after:left-1/2 after:-bottom-1
                             after:w-0 after:h-px after:bg-[#e8bfa0]/70
                             after:transition-all after:duration-500 after:ease-out
                             hover:after:left-0 hover:after:w-full"
                >
                  +91 82360 55718
                </a>
              </li>
              <li>
                <a
                  href="mailto:thelittlefoodbox@gmail.com"
                  className="relative inline-block text-[13px] text-[#f5e9d4]/65 hover:text-[#e8bfa0]
                             tracking-wide transition-colors duration-500 ease-out
                             after:content-[''] after:absolute after:left-1/2 after:-bottom-1
                             after:w-0 after:h-px after:bg-[#e8bfa0]/70
                             after:transition-all after:duration-500 after:ease-out
                             hover:after:left-0 hover:after:w-full"
                >
                  thelittlefoodbox@gmail.com
                </a>
              </li>
              <li className="text-[13px] text-[#f5e9d4]/45 tracking-wide">Ahmedabad, Gujarat</li>
            </ul>

            <a
              href="https://wa.me/918236055718"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                         bg-[#b5572a] text-[#fdf6ec] text-[13px] tracking-[0.04em]
                         shadow-[0_4px_18px_-6px_rgba(181,87,42,0.55)]
                         hover:shadow-[0_10px_28px_-8px_rgba(181,87,42,0.6)]
                         hover:-translate-y-[3px]
                         transition-all duration-500 ease-out"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.3c-.1-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5c-.1 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2 1 2.4c.1.1 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1s.2-.9.1-1z" />
              </svg>
              Message us on WhatsApp
            </a>

            <div className="mt-2">
              <a
                href="https://instagram.com/thelittlefoodbox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#f5e9d4]/45 hover:text-[#e8bfa0] tracking-wide
                           transition-colors duration-500 ease-out
                           underline underline-offset-[6px] decoration-[#f5e9d4]/15 hover:decoration-[#e8bfa0]/60"
              >
                @thelittlefoodbox
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-[#f5e9d4]/[0.07]" />

        {/* Bottom bar */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[11px] text-[#f5e9d4]/35 tracking-[0.04em]">
            © {new Date().getFullYear()} The Little Food Box
          </p>
          <p className="text-[11px] text-[#f5e9d4]/35 tracking-[0.04em]">
            Made with <span className="text-[#b5572a]/80">♥</span> by{" "}
            <a
              href="https://www.blainfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5e9d4]/60 hover:text-[#b5572a] transition-colors duration-300"
            >
              BLA Infotech
            </a>
          </p>
          <div className="flex items-center gap-3 text-[11px] text-[#f5e9d4]/30 tracking-[0.04em]">
            <a href="/privacy-policy" className="hover:text-[#e8bfa0]/80 transition-colors duration-500 ease-out">
              Privacy
            </a>
            <span className="text-[#f5e9d4]/15">•</span>
            <a href="/terms" className="hover:text-[#e8bfa0]/80 transition-colors duration-500 ease-out">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}