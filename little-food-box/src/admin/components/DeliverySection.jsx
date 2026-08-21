import React from "react";
import { formatTime } from "../../utils/time.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
                                    {slot.shift} • {formatTime(slot.startTime)}-{formatTime(slot.endTime)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="field-label">Start Date</div>
                        <DatePicker
                            selected={startDate ? new Date(startDate + "T00:00:00") : null}
                            onChange={(date) => {
                                if (!date) return;
                                const yyyy = date.getFullYear();
                                const mm = String(date.getMonth() + 1).padStart(2, "0");
                                const dd = String(date.getDate()).padStart(2, "0");
                                setStartDate(`${yyyy}-${mm}-${dd}`);
                            }}
                            filterDate={(date) => date.getDay() !== 0}
                            minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                            className="date-input"
                            wrapperClassName="date-input-wrapper"
                            portalId="datepicker-portal"
                            withPortal={window.innerWidth < 640}
                            popperPlacement="bottom-start"
                            popperProps={{ strategy: "fixed" }}
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