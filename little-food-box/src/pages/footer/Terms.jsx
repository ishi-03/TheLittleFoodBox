const sections = [
  {
    id: "01",
    title: "Orders",
    body: "All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order at our discretion, for reasons such as stock unavailability or errors in pricing.",
  },
  {
    id: "02",
    title: "Subscriptions",
    body: "Subscription deliveries will be made according to your selected plan and schedule. Plan details, including frequency and pricing, will be shared with you at the time of signup.",
  },
  {
    id: "03",
    title: "Payments",
    body: "Payments are processed securely through trusted payment gateways. We do not store your card or bank details on our systems.",
  },
  {
    id: "04",
    title: "Cancellation",
    body: "Cancellation requests are subject to our cancellation policy and may vary depending on the selected plan. If you wish to cancel a subscription midway, please reach out to us directly, as cancellations are handled on a case-by-case basis.",
  },
  {
    id: "05",
    title: "Returns & Refunds",
    list: [
      "If you cancel a subscription midway, refunds are not automatic — please contact our owner directly to discuss your case.",
      "If food is delivered damaged or spoiled, we'll happily arrange a replacement, provided the original box is returned to us.",
      "Outside of damaged or spoiled items, boxes are not eligible for return, replacement, or refund once delivered.",
    ],
  },
  {
    id: "06",
    title: "Delivery",
    body: "Delivery times are estimates and may vary due to weather, traffic, or other unforeseen circumstances. We aren't liable for delays caused by factors beyond our control.",
  },
  {
    id: "07",
    title: "Changes",
    body: "Little Food Box reserves the right to modify these terms at any time. Continued use of our service after changes are made means you accept the updated terms.",
  },
];

const Terms = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2a201a]">
      {/* Header */}
      <header className="border-b border-[#e6dccd] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-[#8a6a4c] hover:text-[#c9752f] transition-colors mb-8"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12.5L5.5 8L10 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <p className="uppercase tracking-[0.25em] text-xs text-[#c9752f] mb-4">
            Little Food Box
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-[#6b5c4d] leading-relaxed max-w-xl">
            Please read these terms carefully before placing an order or
            subscribing to a plan with us.
          </p>
          <p className="text-sm text-[#9c8a78] mt-6">
            Last updated: 20 July 2026
          </p>
        </div>
      </header>

      {/* Sections */}
      <main className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto divide-y divide-[#e6dccd]">
          {sections.map((section) => (
            <section key={section.id} className="py-10 first:pt-0">
              <div className="flex gap-6">
                <span className="text-sm text-[#c9752f] font-mono pt-1 shrink-0">
                  {section.id}
                </span>
                <div>
                  <h2 className="text-2xl font-light mb-3">
                    {section.title}
                  </h2>
                  {section.body && (
                    <p className="text-[#5a4c3f] leading-relaxed">
                      {section.body}
                    </p>
                  )}
                  {section.list && (
                    <ul className="space-y-2 mt-1">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="text-[#5a4c3f] leading-relaxed flex gap-3"
                        >
                          <span className="text-[#c9752f]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Contact */}
      <footer className="border-t border-[#e6dccd] px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-light mb-2">Questions about these terms?</h2>
          <p className="text-[#5a4c3f]">
            Write to us at{" "}
            <a
              href="mailto:hello@thelittlefoodbox.com"
              className="text-[#c9752f] hover:underline"
            >
              thelittlefood@gmail.com
            </a>{" "}
            and we'll be happy to help.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Terms;