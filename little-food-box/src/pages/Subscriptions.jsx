
import React, { useState } from "react";

const Subscriptions = () => {
    const weeklyMenu = [
        { day: "Monday", salad: "🥗 Sprouts Salad" },
        { day: "Tuesday", salad: "🧀 Paneer Salad" },
        { day: "Wednesday", salad: "🍓 Fruit Bowl" },
        { day: "Thursday", salad: "🥗 Greek Veg Salad" },
        { day: "Friday", salad: "🌽 Corn Salad" },
        { day: "Saturday", salad: "🥗 Chickpea Salad" },
        { day: "Sunday", salad: "✨ Detox Bowl" },
    ];

    const [timeSlot, setTimeSlot] = useState("");
    const [subscribed, setSubscribed] = useState(false);

   const handleSubscribe = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const res = await fetch("http://localhost:5000/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timeSlot,
      userId: user._id
    })
  });

  const data = await res.json();
  console.log("RESPONSE 👉", data);

  alert("Subscribed successfully!");
};
    return (
        <div style={{ padding: "20px", background: "#f5f0e8", minHeight: "100vh" }}>

            {/* PLAN CARD */}
            <div style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginBottom: "20px",
                textAlign: "center"
            }}>
                <h2>Monthly Salad Plan</h2>
                <h3 style={{ color: "green" }}>₹1799</h3>
                <p>Daily healthy salad delivery</p>

                {/* SELECT TIME */}
                <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{ marginTop: "10px", padding: "8px" }}
                >
                    <option value="">Select Delivery Time</option>
                    <option>8 AM - 10 AM</option>
                    <option>12 PM - 2 PM</option>
                    <option>6 PM - 8 PM</option>
                </select>

                <br />

                {/* BUTTON */}
                <button
                    onClick={handleSubscribe}
                    disabled={subscribed}
                    style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        background: subscribed ? "gray" : "green",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: subscribed ? "not-allowed" : "pointer"
                    }}
                >
                    {subscribed ? "Subscribed ✅" : "Subscribe"}
                </button>

                {/* SUCCESS MESSAGE */}
                {subscribed && (
                    <p style={{ color: "green", marginTop: "10px" }}>
                        Your salad subscription is active 🎉
                    </p>
                )}
            </div>

            {/* WEEKLY MENU */}
            <div style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ marginBottom: "10px" }}>Weekly Salad Plan</h2>

                {weeklyMenu.map((item, index) => (
                    <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        borderBottom: "1px solid #eee"
                    }}>
                        <span>{item.day}</span>
                        <span>{item.salad}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Subscriptions;

