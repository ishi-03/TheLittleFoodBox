   
   import React from "react";
   
   const SubscriptionHeader = ({
  step,
  plans,
  loadingPlans,
  selectedPlan,
  handleSelectPlan,
}) => {
  return (
    <>
       
    
    {/* ============ HERO ============ */}
          <div className="hero">
            <div className="hero-ring-wrap">
              <svg className="hero-ring" viewBox="0 0 190 190" width="190" height="190">
                <circle cx="95" cy="95" r="86" fill="none" stroke="#5AAA4E" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" />
              </svg>
              <div className="hero-bowl">🥗</div>
              <span className="floaty floaty-1">🥬</span>
              <span className="floaty floaty-2">🍅</span>
              <span className="floaty floaty-3">🥒</span>
              <span className="floaty floaty-4">🥑</span>
            </div>

            <div className="hero-eyebrow">
              <span className="hero-dot" />
              Fresh Daily Delivery
            </div>
            <h1>Eat <em>fresh.</em> Feel better.<br />Every day.</h1>
            <p className="sub">
              Chef-crafted salads, tailored to your goals and delivered to your door
              each morning — a premium ritual for a healthier week.
            </p>

            <div className="trust-row">
              <div className="trust-badge">🌿 Fresh Daily</div>
              <div className="trust-badge">🩺 Nutritionist Approved</div>
              <div className="trust-badge">🎛️ Customizable</div>
              <div className="trust-badge">🚚 Free Delivery</div>
            </div>
          </div>

          {/* ============ PROGRESS ============ */}
          <div className="progress-wrap">
            <div className="progress-step">
              <div className={`progress-node ${step === 1 ? "active" : "done"}`}>{step > 1 ? "✓" : "1"}</div>
              <span className={`progress-label ${step === 1 ? "active" : ""}`}>Choose Plan</span>
            </div>
            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: step > 1 ? "100%" : "0%" }} /></div>
            <div className="progress-step">
              <div className={`progress-node ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>{step > 2 ? "✓" : "2"}</div>
              <span className={`progress-label ${step === 2 ? "active" : ""}`}>Choose Salads</span>
            </div>
            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: step > 2 ? "100%" : "0%" }} /></div>
            <div className="progress-step">
              <div className={`progress-node ${step === 3 ? "active" : ""}`}>3</div>
              <span className={`progress-label ${step === 3 ? "active" : ""}`}>Checkout</span>
            </div>
          </div>

          {/* ============ STEP 1: PLAN ============ */}
          <div className="section-head">
            <div className="section-eyebrow">Step 1</div>
            <h2 className="section-title">Choose your plan</h2>
          </div>

       <div className="plan-grid">
  {loadingPlans ? (
    <div
      style={{
        gridColumn: "1 / -1",
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      <h3>Loading Plans...</h3>
      <p style={{ color: "#777", marginTop: "10px" }}>
        Waking up server. This may take 20–30 seconds.
      </p>
    </div>
  ) : (
    plans.map((plan, idx) => (
      <div
        key={plan._id}
        className={`plan-card ${selectedPlan === plan._id ? "selected" : ""}`}
        onClick={() => handleSelectPlan(plan)}
      >
        {idx === 1 && <div className="plan-popular">MOST POPULAR</div>}
        <div className="plan-icon">
          {idx === 0 ? "🥗" : idx === 1 ? "🌿" : "✨"}
        </div>

        <h3>{plan.name}</h3>

        <div className="plan-units">
          {plan.units} meals · {plan.validity} days
        </div>

        <div className="plan-price-row">
          <span className="amt">₹{plan.price}</span>
          <span className="per">total</span>
        </div>

        <div className="plan-per-unit">
          ₹{plan.pricePerUnit} / meal
        </div>

        <div className="plan-tags">
          {plan.deliveryPatterns?.slice(0, 2).map((d) => (
            <span className="plan-tag" key={d}>
              {d}
            </span>
          ))}
        </div>
      </div>
    ))
  )}
</div>
    </>
  );
};

export default SubscriptionHeader;
    
    
  