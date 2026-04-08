import React, { useEffect, useState } from "react";

const MySubscription = () => {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/api/subscriptions/${user._id}`)
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  if (!user) return <h2>Please login</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Subscription</h2>

      {data.length === 0 ? (
        <p>No subscription found</p>
      ) : (
        data.map((sub, i) => (
          <div key={i} style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}>
            <p><b>Plan:</b> {sub.plan}</p>
            <p><b>Time:</b> {sub.timeSlot}</p>
            <p><b>Status:</b> Active</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MySubscription;