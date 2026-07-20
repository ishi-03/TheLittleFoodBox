const sections = [
  {
    id: "01",
    title: "Information We Collect",
    body:
      "When you place an order or create an account, we collect your name, email address, phone number, delivery address, order history, and payment information required to process transactions. We may also collect basic device and browser data when you visit our website.",
  },
  {
    id: "02",
    title: "How We Use Your Information",
    list: [
      "Process, pack, and deliver your orders.",
      "Manage subscriptions and recurring boxes.",
      "Provide customer support and respond to queries.",
      "Send order confirmations and delivery updates.",
      "Improve our menu, packaging, and service quality.",
      "Send occasional offers, only if you've opted in.",
    ],
  },
  {
    id: "03",
    title: "How We Share Your Information",
    body:
      "We share your information only where necessary: with delivery partners to fulfil your order, with payment processors to complete transactions securely, and with service providers who help us run our platform. We do not sell your personal information to third parties.",
  },
  {
    id: "04",
    title: "Data Protection",
    body:
      "Your information is stored on secure servers with restricted access. All payment details are handled directly by our third-party payment providers under their own security standards — we do not store your card details on our systems.",
  },
  {
    id: "05",
    title: "Cookies",
    body:
      "We use cookies and similar technologies to remember your preferences, keep your cart updated, and understand how our website is used, so we can make it faster and easier to navigate. You can disable cookies in your browser settings, though some features may not work as intended.",
  },
  {
    id: "06",
    title: "Your Rights",
    body:
      "You can request access to, correction of, or deletion of your personal information at any time. To make a request, simply write to us using the contact details below and we'll respond within a reasonable time.",
  },
  {
    id: "07",
    title: "Retention",
    body:
      "We retain your information only for as long as needed to fulfil the purposes described in this policy, or as required by law, after which it is securely deleted or anonymised.",
  },
  {
    id: "08",
    title: "Changes to This Policy",
    body:
      "We may update this policy from time to time to reflect changes in our practices or for legal reasons. The 'last updated' date below will always show the most recent revision.",
  },
];

const PrivacyPolicy = ({ onBack }) => {
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
            Privacy Policy
          </h1>
          <p className="text-[#6b5c4d] leading-relaxed max-w-xl">
            We respect your privacy and are committed to protecting your
            personal information. Here's exactly what we collect, why, and
            how you stay in control of it.
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
          <h2 className="text-xl font-light mb-2">Questions about your data?</h2>
          <p className="text-[#5a4c3f]">
            Write to us at{" "}
            <a
              href="mailto:thelittlefoodbox@gmail.com"
              className="text-[#c9752f] hover:underline"
            >
              thelittlefoodbox@gmail.com
            </a>{" "}
            and we'll be happy to help.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;