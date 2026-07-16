import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaClipboardList,
  FaShoppingCart,
  FaHome,
  FaBriefcase,
  FaEllipsisH,
  FaCalendarAlt,
  FaBoxOpen,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";

/**
 * Checkout.jsx
 * -------------------------------------------------------------------------
 * Checkout page for "The Little Food Box" meal subscription service.
 * Receives `plan` and `slot` via React Router's useLocation() state.
 * Collects delivery address details, shows a subscription + order summary,
 * validates required fields, and (for now) logs the collected data to the
 * console in place of a real Razorpay payment call.
 * -------------------------------------------------------------------------
 */

const Checkout = () => {
  // ---------------------------------------------------------------------
  // Receive plan & slot passed from the Subscription Plans page
  // ---------------------------------------------------------------------
  const { state } = useLocation();
  const plan = state?.plan;
  const slot = state?.slot;

  
 

  const displayPlan = {
    name: plan?.name ?? dummyPlan.name,
    duration: plan?.duration ?? dummyPlan.duration,
    price: plan?.price ?? dummyPlan.price,
    description: plan?.description ?? dummyPlan.description,
  };

  const displaySlot = {
    day: slot?.day ?? dummySlot.day,
    time: slot?.time ?? dummySlot.time,
  };

  // Expected start date -> tomorrow, formatted nicely
  const expectedStartDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-IN",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  // ---------------------------------------------------------------------
  // Local state: delivery address form
  // ---------------------------------------------------------------------
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    altPhone: "",
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
    saveAddress: false,
  });

  const [errors, setErrors] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Handle text / radio / checkbox input changes generically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear the field's error as soon as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------
  const validate = () => {
    const newErrors = {};

    if (!address.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(address.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!address.houseNo.trim()) newErrors.houseNo = "House / Flat number is required.";
    if (!address.street.trim()) newErrors.street = "Street / Area is required.";
    if (!address.city.trim()) newErrors.city = "City is required.";
    if (!address.state.trim()) newErrors.state = "State is required.";
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(address.pincode.trim())) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------------------------------
  // Submit handler — validation only for now, Razorpay comes later
  // ---------------------------------------------------------------------
  const handleProceedToPayment = () => {
    const isValid = validate();

    if (!isValid) {
      setOrderConfirmed(false);
      return;
    }

    // Log collected data — this is where Razorpay will hook in later
    console.log("Delivery Address:", address);
    console.log("Selected Plan:", displayPlan);
    console.log("Selected Slot:", displaySlot);

    setOrderConfirmed(true);
  };

  // Order summary calculations
  const deliveryFee = 0; // FREE
  const discount = 0;
  const gst = 0;
  const total = displayPlan.price + deliveryFee - discount + gst;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] to-[#F1EFE7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ================================================================
            SECTION 1 — Heading + Breadcrumb + Journey Stepper
        ================================================================= */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2F3E36] tracking-tight">
            Checkout
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-[#6B7A70]">
            <span className="hover:text-[#3A5A40] transition-colors cursor-pointer">
              Subscription
            </span>
            <span className="text-[#B7C4B9]">/</span>
            <span className="text-[#3A5A40] font-medium">Checkout</span>
          </div>

          {/* Signature element: delivery-journey stepper. This is a real
              sequence (plan chosen -> checkout -> payment), so numbering
              genuinely encodes progress rather than decorating the page. */}
          <div className="mt-6 flex items-center">
            {["Plan Selected", "Checkout", "Payment"].map((stepLabel, idx) => {
              const isActive = idx === 1;
              const isDone = idx < 1;
              return (
                <React.Fragment key={stepLabel}>
                  <div className="flex flex-col items-center text-center w-20 sm:w-28">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold border-2 transition-colors ${
                        isDone
                          ? "bg-[#3A5A40] border-[#3A5A40] text-white"
                          : isActive
                          ? "bg-white border-[#3A5A40] text-[#3A5A40]"
                          : "bg-white border-[#D9D4C7] text-[#B7B2A3]"
                      }`}
                    >
                      {isDone ? <FaCheckCircle /> : <FaLeaf className={isActive ? "" : "opacity-50"} />}
                    </div>
                    <span
                      className={`mt-2 text-[11px] sm:text-xs font-medium ${
                        isActive ? "text-[#2F3E36]" : "text-[#9AA69B]"
                      }`}
                    >
                      {stepLabel}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`flex-1 h-[2px] mb-5 ${
                        idx < 1 ? "bg-[#3A5A40]" : "bg-[#D9D4C7]"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            MAIN GRID — Left: Address + Subscription | Right: Order Summary
        ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div className="lg:col-span-2 space-y-6">
            {/* ==============================================================
                SECTION 2 — Delivery Address Card
            =============================================================== */}
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-black/5 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#EDF3EC] flex items-center justify-center text-[#3A5A40]">
                  <FaMapMarkerAlt />
                </div>
                <h2 className="font-serif text-xl font-semibold text-[#2F3E36]">
                  Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#3D4A41] mb-1.5">
                    <FaUser className="text-[#8CA893]" size={12} /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ishi Sharma"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="sm:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#3D4A41] mb-1.5">
                    <FaPhone className="text-[#8CA893]" size={12} /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Alternate Phone */}
                <div className="sm:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#3D4A41] mb-1.5">
                    <FaPhone className="text-[#C9C4B4]" size={12} /> Alternate Phone
                  </label>
                  <input
                    type="tel"
                    name="altPhone"
                    value={address.altPhone}
                    onChange={handleChange}
                    placeholder="Optional"
                    maxLength={10}
                    className="w-full rounded-xl border border-[#E3E0D6] px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 focus:ring-[#B7C4B9] transition-all"
                  />
                </div>

                {/* House / Flat Number */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[#3D4A41] mb-1.5 block">
                    House / Flat Number *
                  </label>
                  <input
                    type="text"
                    name="houseNo"
                    value={address.houseNo}
                    onChange={handleChange}
                    placeholder="e.g. B-204, Palm Residency"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.houseNo
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.houseNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.houseNo}</p>
                  )}
                </div>

                {/* Street / Area */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[#3D4A41] mb-1.5 block">
                    Street / Area *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    placeholder="e.g. MG Road"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.street
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                </div>

                {/* Landmark */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[#3D4A41] mb-1.5 block">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={address.landmark}
                    onChange={handleChange}
                    placeholder="Optional — e.g. Near City Mall"
                    className="w-full rounded-xl border border-[#E3E0D6] px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 focus:ring-[#B7C4B9] transition-all"
                  />
                </div>

                {/* City */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[#3D4A41] mb-1.5 block">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    placeholder="e.g. Ahmedabad"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.city
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[#3D4A41] mb-1.5 block">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    placeholder="e.g. Gujarat"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.state
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>

                {/* Pincode */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[#3D4A41] mb-1.5 block">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#2F3E36] placeholder-[#B7B2A3] focus:outline-none focus:ring-2 transition-all ${
                      errors.pincode
                        ? "border-red-400 focus:ring-red-200"
                        : "border-[#E3E0D6] focus:ring-[#B7C4B9]"
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                  )}
                </div>
              </div>

              {/* Address Type — Radio buttons */}
              <div className="mt-6">
                <span className="text-sm font-medium text-[#3D4A41] mb-2 block">
                  Address Type
                </span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Home", icon: <FaHome size={12} /> },
                    { label: "Work", icon: <FaBriefcase size={12} /> },
                    { label: "Other", icon: <FaEllipsisH size={12} /> },
                  ].map(({ label, icon }) => (
                    <label
                      key={label}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${
                        address.addressType === label
                          ? "bg-[#EDF3EC] border-[#3A5A40] text-[#3A5A40] font-medium"
                          : "bg-white border-[#E3E0D6] text-[#6B7A70] hover:border-[#B7C4B9]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="addressType"
                        value={label}
                        checked={address.addressType === label}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {icon}
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Save address checkbox */}
              <div className="mt-5 flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="saveAddress"
                  name="saveAddress"
                  checked={address.saveAddress}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-[#3A5A40] cursor-pointer"
                />
                <label
                  htmlFor="saveAddress"
                  className="text-sm text-[#3D4A41] cursor-pointer select-none"
                >
                  Save this address for future deliveries
                </label>
              </div>
            </div>

            {/* ==============================================================
                SECTION 3 — Subscription Details Card
            =============================================================== */}
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-black/5 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FCEFE6] flex items-center justify-center text-[#C2703D]">
                  <FaClipboardList />
                </div>
                <h2 className="font-serif text-xl font-semibold text-[#2F3E36]">
                  Subscription Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#9AA69B] mb-1">
                    Plan Name
                  </p>
                  <p className="text-[#2F3E36] font-semibold">{displayPlan.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#9AA69B] mb-1">
                    Plan Duration
                  </p>
                  <p className="text-[#2F3E36] font-semibold">{displayPlan.duration}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#9AA69B] mb-1">
                    Plan Price
                  </p>
                  <p className="text-[#2F3E36] font-semibold">
                    &#8377;{displayPlan.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#9AA69B] mb-1">
                    Selected Delivery Slot
                  </p>
                  <p className="flex items-center gap-2 text-[#2F3E36] font-semibold">
                    <FaCalendarAlt className="text-[#8CA893]" size={13} />
                    {displaySlot.day}, {displaySlot.time}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-[#9AA69B] mb-1">
                    Description
                  </p>
                  <p className="text-[#5C6A60] text-sm leading-relaxed">
                    {displayPlan.description}
                  </p>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 pt-2 border-t border-[#F0EEE6]">
                  <FaBoxOpen className="text-[#C2703D]" size={14} />
                  <p className="text-sm text-[#3D4A41]">
                    Expected Start Date:{" "}
                    <span className="font-semibold text-[#2F3E36]">
                      {expectedStartDate}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN ---------------- */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-6">
              {/* ==============================================================
                  SECTION 4 — Order Summary Card
              =============================================================== */}
              <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-black/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF3EC] flex items-center justify-center text-[#3A5A40]">
                    <FaShoppingCart />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-[#2F3E36]">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#5C6A60]">
                    <span>Plan Price</span>
                    <span className="font-medium text-[#2F3E36]">
                      &#8377;{displayPlan.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5C6A60]">
                    <span>Delivery</span>
                    <span className="font-medium text-[#3A5A40]">FREE</span>
                  </div>
                  <div className="flex justify-between text-[#5C6A60]">
                    <span>Discount</span>
                    <span className="font-medium text-[#2F3E36]">
                      &#8377;{discount}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5C6A60]">
                    <span>GST</span>
                    <span className="font-medium text-[#2F3E36]">&#8377;{gst}</span>
                  </div>
                </div>

                <div className="my-5 border-t border-dashed border-[#E3E0D6]" />

                {/* Highlighted total */}
                <div className="flex justify-between items-center bg-[#EDF3EC] rounded-xl px-4 py-3.5">
                  <span className="font-semibold text-[#2F3E36]">Total</span>
                  <span className="font-serif text-xl font-bold text-[#2F3E36]">
                    &#8377;{total.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* ============================================================
                    SECTION 5 — Proceed To Payment Button
                =========================================================== */}
                <button
                  onClick={handleProceedToPayment}
                  className="mt-6 w-full py-3.5 rounded-xl font-semibold text-white text-base
                             bg-gradient-to-r from-[#4E8C6A] to-[#2F5233]
                             hover:from-[#59996F] hover:to-[#39623F]
                             active:scale-[0.98] hover:shadow-lg hover:shadow-[#3A5A40]/30
                             transition-all duration-200"
                >
                  Proceed To Payment
                </button>

                {orderConfirmed && (
                  <p className="mt-3 flex items-center gap-2 text-sm text-[#3A5A40] bg-[#EDF3EC] rounded-lg px-3 py-2">
                    <FaCheckCircle /> Details captured — Razorpay integration coming soon.
                  </p>
                )}

                <p className="mt-4 text-center text-xs text-[#9AA69B]">
                  Your subscription starts only after successful payment confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;