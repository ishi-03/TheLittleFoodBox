const Terms = () => {
  return (
    <div className="min-h-screen bg-[#1a120f] text-[#f5f1eb] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-8">Terms & Conditions</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl mb-3">Orders</h2>
            <p className="text-gray-300">
              All orders are subject to availability and confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Subscriptions</h2>
            <p className="text-gray-300">
              Subscription deliveries will be made according to your selected
              plan and schedule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Payments</h2>
            <p className="text-gray-300">
              Payments are processed securely through trusted payment gateways.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Cancellation</h2>
            <p className="text-gray-300">
              Cancellation requests are subject to our cancellation policy and
              may vary depending on the selected plan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Delivery</h2>
            <p className="text-gray-300">
              Delivery times are estimates and may vary due to weather,
              traffic, or unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">Changes</h2>
            <p className="text-gray-300">
              Little Food Box reserves the right to modify these terms at any
              time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;