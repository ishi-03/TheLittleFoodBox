import React from "react";

const DeliverySection = ({
    slots,
    selectedSlot,
    setSelectedSlot,
    startDate,
    setStartDate,
    deliveryPattern,
    setDeliveryPattern,
}) => {
    return (
        <>
            {/* Logistics Card */}
            {/* ============ LOGISTICS: slot + date ============ */}
            <div className="logistics-card">
                <div className="logistics-inner">
                    <div>
                        <div className="field-label">Delivery Slot</div>
                        <div className="slot-pills">
                            {slots.map((slot) => (
                                <div
                                    key={slot._id}
                                    className={`slot-pill ${selectedSlot === slot._id ? "active" : ""}`}
                                    onClick={() => setSelectedSlot(slot._id)}
                                >
                                    {slot.shift} • {slot.startTime}-{slot.endTime}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="field-label">Start Date</div>
                      <input
  type="date"
  className="date-input"
  value={startDate}
  min={new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]}
  onChange={(e) => setStartDate(e.target.value)}
/>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <div className="field-label">Delivery Pattern</div>

                        <div className="slot-pills">
                            <div
                                className={`slot-pill ${deliveryPattern === "Daily" ? "active" : ""}`}
                                onClick={() => setDeliveryPattern("Daily")}
                            >
                                Daily
                            </div>

                            <div
                                className={`slot-pill ${deliveryPattern === "Alternate Day" ? "active" : ""}`}
                                onClick={() => setDeliveryPattern("Alternate Day")}
                            >
                                Alternate Day
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DeliverySection;

