const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1a120f] text-[#f5f1eb] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-8">Privacy Policy</h1>

        <p className="text-gray-300 mb-8">
          At Little Food Box, we respect your privacy and are committed to
          protecting your personal information.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl mb-3">Information We Collect</h2>
            <p className="text-gray-300">
              We may collect your name, email address, phone number, delivery
              address, order details, and payment information required to
              process your orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2">
              <li>Process and deliver your orders.</li>
              <li>Manage subscriptions.</li>
              <li>Provide customer support.</li>
              <li>Send order updates.</li>
              <li>Improve our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Data Protection</h2>
            <p className="text-gray-300">
              Your information is stored securely. Payment details are processed
              through secure third-party payment providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Cookies</h2>
            <p className="text-gray-300">
              We may use cookies to improve your browsing experience and website
              performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Contact Us</h2>
            <p className="text-gray-300">
              Email: hello@thelittlefoodbox.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;