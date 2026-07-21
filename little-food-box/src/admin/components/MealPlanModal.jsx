import html2pdf from "html2pdf.js";
import { useRef, useState } from "react";
import { formatTime } from "../../utils/time.js";
function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Paused: "bg-amber-50 text-amber-700 border-amber-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
  };
  const style = styles[status] || "bg-stone-100 text-stone-600 border-stone-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${style}`}
    >
      {status || "Unknown"}
    </span>
  );
}

function PaymentBadge({ status }) {
  const isPaid = status === "Paid";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
        isPaid
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPaid ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {status || "Unpaid"}
    </span>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-stone-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-base">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
            {label}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
            {value ?? "-"}
          </p>
          {sub && <p className="mt-0.5 text-xs text-stone-400">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
      {children}
    </h3>
  );
}

function MealStatusBadge({ status }) {
  const styles = {
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Skipped: "bg-stone-100 text-stone-500 border-stone-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  const style = styles[status] || "bg-stone-100 text-stone-600 border-stone-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style}`}
    >
      {status || "Scheduled"}
    </span>
  );
}

function MealCard({ meal }) {
  const [expanded, setExpanded] = useState(false);
  const salad = meal.salad;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Collapsed header - always visible */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-stone-50 border border-stone-200 font-serif text-sm font-semibold text-stone-700">
            {meal.mealNo}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-serif text-base font-semibold text-stone-800 truncate">
                {salad?.name || "No salad selected"}
              </h4>
              <MealStatusBadge status={meal.status} />
            </div>

            <p className="mt-1 text-xs text-stone-500">
              {meal.date && new Date(meal.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              {meal.deliverySlotId && (
                <span className="text-stone-400">
                  {" "}
                  · {formatTime(meal.deliverySlotId.startTime)} - {formatTime(meal.deliverySlotId.endTime)}
                </span>
              )}
            </p>
          </div>
        </div>

        <svg
          className={`h-5 w-5 flex-shrink-0 text-stone-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4">
          {!salad ? (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-6 text-center text-sm text-red-500">
              No salad selected for this day.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Image + description */}
              <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                <div className="overflow-hidden rounded-xl border border-stone-200 group">
                  {salad.image ? (
                    <img
                      src={salad.image}
                      alt={salad.name}
                      className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-full"
                    />
                  ) : (
                    <div className="flex h-32 w-full items-center justify-center bg-stone-50 text-2xl sm:h-full">
                      🥗
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {salad.description}
                  </p>

                  {/* Day / Date / Slot */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                    {meal.day && (
                      <span>
                        <strong className="font-medium text-stone-600">Day:</strong> {meal.day}
                      </span>
                    )}
                    <span>
                      <strong className="font-medium text-stone-600">Date:</strong>{" "}
                      {meal.date && new Date(meal.date).toLocaleDateString()}
                    </span>
                    {meal.deliverySlotId && (
                      <span>
                        <strong className="font-medium text-stone-600">Slot:</strong>{" "}
                        {formatTime(meal.deliverySlotId.startTime)} - {formatTime(meal.deliverySlotId.endTime)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Nutrition */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Calories", value: salad.calories },
                  { label: "Protein", value: salad.protein != null ? `${salad.protein} g` : null },
                  { label: "Carbs", value: salad.carbs != null ? `${salad.carbs} g` : null },
                  { label: "Fat", value: salad.fat != null ? `${salad.fat} g` : null },
                ].map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl bg-stone-50 border border-stone-100 px-3 py-2.5 text-center"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                      {n.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-stone-800">
                      {n.value ?? "-"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              {salad.ingredients?.length > 0 && (
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                    Ingredients
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {salad.ingredients.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 border border-emerald-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dressings: available vs selected */}
              {salad.dressings?.length > 0 && (
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                    Dressings
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {salad.dressings.map((item, i) => {
                      const isSelected =
                        meal.dressing &&
                        item?.toLowerCase?.() === meal.dressing?.toLowerCase?.();
                      return (
                        <span
                          key={i}
                          className={
                            isSelected
                              ? "rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white border border-amber-500 shadow-sm ring-2 ring-amber-200"
                              : "rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700 border border-amber-100"
                          }
                        >
                          {item}
                          {isSelected && " ✓"}
                        </span>
                      );
                    })}
                  </div>
                  {meal.dressing && (
                    <p className="mt-1.5 text-xs text-stone-500">
                      Selected: <span className="font-medium text-amber-700">{meal.dressing}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Selected variant + vegan/jain badges (what customer actually picked) */}
              <div className="flex flex-wrap items-center gap-2">
                {meal.variant && (
                  <span className="rounded-full bg-stone-800 px-3 py-1 text-xs font-semibold text-white">
                    Selected variant: {meal.variant}
                  </span>
                )}

                {meal.vegan && (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    🌱 Vegan
                  </span>
                )}

                {meal.jain && (
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    🪔 Jain
                  </span>
                )}

                <MealStatusBadge status={meal.status} />
              </div>
              {meal.note && (
  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
    <p className="text-xs font-semibold uppercase text-amber-700">
      Special Instructions
    </p>

    <p className="mt-1 text-sm text-stone-700">
      {meal.note}
    </p>
  </div>
)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MealPlanModal({ open, onClose, subscription }) {
  if (!open || !subscription) return null;

  const addr = subscription.deliveryAddress;
  const plan = subscription.planId;
  const slot = subscription.deliverySlotId;
const pdfRef = useRef(null);
const handleExportPDF = () => {
  if (!pdfRef.current) return;

  const options = {
    margin: 0.4,
    filename: `MealPlan-${subscription.userId?.name || "Customer"}.pdf`,
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(pdfRef.current).save();
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-3 sm:p-6">
<div
  ref={pdfRef}
  className="flex w-full max-w-7xl max-h-[92vh] flex-col rounded-3xl bg-[#FDFBF7] shadow-2xl border border-stone-200/60 overflow-hidden"
>
        {/* Sticky Header */}
        <div className="flex flex-shrink-0 items-start justify-between gap-4 border-b border-stone-200 bg-white/80 px-6 py-5 backdrop-blur sm:px-8">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-600">
              Meal Plan
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-stone-800 truncate sm:text-3xl">
              {subscription.userId?.name || "Customer"}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm text-stone-500">{plan?.name}</span>
              <StatusBadge status={subscription.status} />
              <PaymentBadge status={subscription.paymentStatus} />
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">

          {/* Overview stat cards */}
          <SectionLabel>Overview</SectionLabel>
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <StatCard icon="👤" label="Customer" value={subscription.userId?.name} sub={subscription.userId?.email} />
            <StatCard icon="📞" label="Phone" value={addr?.phone} />
            <StatCard icon="📦" label="Plan" value={plan?.name} sub={plan?.validity ? `${plan.validity} days` : undefined} />
            <StatCard icon="💰" label="Price" value={plan?.price != null ? `₹${plan.price}` : undefined} />
            <StatCard icon="🥗" label="Meals" value={plan?.units} />
            <StatCard
              icon="📅"
              label="Start Date"
              value={subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : undefined}
            />
            <StatCard icon="🔁" label="Delivery Pattern" value={subscription.deliveryPattern} />
            <StatCard
              icon="🕒"
              label="Current Slot"
              value={slot ? `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}` : undefined}
            />
            <StatCard icon="💳" label="Payment Status" value={subscription.paymentStatus} />
            <StatCard icon="🧾" label="Payment ID" value={subscription.paymentId} />
            <StatCard icon="🆔" label="Order ID" value={subscription.orderId} />
            <StatCard
              icon="🗓️"
              label="Payment Date"
              value={subscription.paymentDate ? new Date(subscription.paymentDate).toLocaleDateString() : "-"}
            />
          </div>

          {/* Delivery Address */}
          <SectionLabel>Delivery Address</SectionLabel>
          <div className="mb-8 rounded-2xl border border-stone-200/70 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-stone-800">{addr?.fullName}</p>
                  <p className="mt-1 text-sm text-stone-600">
                    {addr?.house}, {addr?.street}
                  </p>
                  {addr?.landmark && (
                    <p className="text-sm text-stone-500">{addr.landmark}</p>
                  )}
                  <p className="text-sm text-stone-600">
                    {addr?.city}, {addr?.state} - {addr?.pincode}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                    <span>📞 {addr?.phone}</span>
                    {addr?.alternatePhone && <span>📱 Alt: {addr.alternatePhone}</span>}
                  </div>
                </div>
              </div>

              {addr?.addressType && (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600 border border-stone-200">
                  {addr.addressType}
                </span>
              )}
            </div>
          </div>

          {/* Meal Timeline */}
          <SectionLabel>Meal Timeline</SectionLabel>

          {subscription.mealSelections?.length === 0 && (
            <div className="rounded-2xl border border-stone-200/70 bg-white py-12 text-center text-stone-400">
              No Meal Plan Selected
            </div>
          )}

          <div className="space-y-3">
            {subscription.mealSelections?.map((meal) => (
              <MealCard key={meal.mealNo} meal={meal} />
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex flex-shrink-0 items-center justify-end gap-3 border-t border-stone-200 bg-white/80 px-6 py-4 backdrop-blur sm:px-8">
          {/* <button
            onClick={() => window.print()}
            className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            🖨️ Print Meal Plan
          </button> */}
<button
  onClick={handleExportPDF}
  className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
>
  ⬇️ Export PDF
</button>

          <button
            onClick={onClose}
            className="rounded-xl bg-stone-800 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}