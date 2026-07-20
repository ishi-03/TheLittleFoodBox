import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

/* -------------------------------------------------------------------------
   The Little Food Box — Manage Subscription
   Fonts loaded at runtime: Fraunces (display), Plus Jakarta Sans (body),
   JetBrains Mono (nutrition-label data)
------------------------------------------------------------------------- */

const useFonts = () => {
  useEffect(() => {
    if (document.getElementById("tlfb-fonts")) return;
    const link = document.createElement("link");
    link.id = "tlfb-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);
};

const API_BASE = import.meta.env.VITE_API_URL || "";

/* ---------------------------- small utilities --------------------------- */

const formatDate = (d) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

const formatTime = (t) => {
  if (!t) return "—";
  try {
    const [h, m] = t.split(":");
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hr12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hr12}:${m} ${suffix}`;
  } catch {
    return t;
  }
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

/* -------------------------------- badges -------------------------------- */

// const STATUS_STYLES = {
//   active: "bg-[#EAF2E5] text-[#3F6B3F] ring-1 ring-[#3F6B3F]/20",
//   paused: "bg-[#FBF1DD] text-[#9A7615] ring-1 ring-[#9A7615]/20",
//   cancelled: "bg-[#FBEAE4] text-[#B4502E] ring-1 ring-[#B4502E]/20",
//   expired: "bg-[#EFEDE6] text-[#6B675C] ring-1 ring-[#6B675C]/20",
//   delivered: "bg-[#EAF2E5] text-[#3F6B3F] ring-1 ring-[#3F6B3F]/20",
//   completed: "bg-[#EAF2E5] text-[#3F6B3F] ring-1 ring-[#3F6B3F]/20",
//   pending: "bg-[#FBF1DD] text-[#9A7615] ring-1 ring-[#9A7615]/20",
//   skipped: "bg-[#EFEDE6] text-[#6B675C] ring-1 ring-[#6B675C]/20",
//   paid: "bg-[#EAF2E5] text-[#3F6B3F] ring-1 ring-[#3F6B3F]/20",
//   failed: "bg-[#FBEAE4] text-[#B4502E] ring-1 ring-[#B4502E]/20",
// };

// const Badge = ({ status, className = "" }) => {
//   const key = (status || "").toLowerCase();
//   const style = STATUS_STYLES[key] || "bg-[#EFEDE6] text-[#6B675C] ring-1 ring-[#6B675C]/20";
//   return (
//     <span
//       className={cx(
//         "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider font-['Plus_Jakarta_Sans']",
//         style,
//         className
//       )}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {status || "Unknown"}
//     </span>
//   );
// };

/* ------------------------------ skeletons -------------------------------- */

const Shimmer = ({ className = "" }) => (
  <div
    className={cx(
      "relative overflow-hidden rounded-2xl bg-[#E9E6DB]",
      "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
      className
    )}
    style={{ animationName: "shimmer" }}
  />
);

const LoadingState = () => (
  <div className="min-h-screen bg-[#F6F4EC] px-4 py-10 sm:px-8 lg:px-16">
    <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    <div className="mx-auto max-w-6xl space-y-10">
      <Shimmer className="h-72 w-full rounded-[2rem]" />
      <Shimmer className="h-40 w-full rounded-[2rem]" />
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Shimmer key={i} className="h-64 w-full rounded-[2rem]" />
        ))}
      </div>
    </div>
  </div>
);

/* -------------------------------- error ---------------------------------- */

const ErrorState = ({ message, onRetry }) => (
  <div className="flex min-h-screen items-center justify-center bg-[#F6F4EC] px-6">
    <div className="w-full max-w-md rounded-[2rem] border border-[#B4502E]/15 bg-white p-10 text-center shadow-[0_20px_60px_-15px_rgba(31,46,26,0.15)]">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBEAE4]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#B4502E]">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#1F2E1A]">
        Something didn't load right
      </h2>
      <p className="mt-2 font-['Plus_Jakarta_Sans'] text-sm text-[#6B675C]">
        {message || "We couldn't fetch this subscription. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="mt-7 w-full rounded-full bg-[#1F2E1A] py-3 font-['Plus_Jakarta_Sans'] text-sm font-semibold text-white transition hover:bg-[#3F6B3F]"
      >
        Try again
      </button>
    </div>
  </div>
);

/* -------------------------------- empty ----------------------------------- */

const EmptyMeals = () => (
  <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#3F6B3F]/25 bg-white/60 px-8 py-16 text-center">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mb-5 text-[#3F6B3F]/50">
      <path
        d="M4 8h16M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 8v8a2 2 0 0 0 2 2h5m5-10v3m-8 7h3m5-3.5 2 2 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <h3 className="font-['Fraunces'] text-xl font-semibold text-[#1F2E1A]">
      No meals scheduled yet
    </h3>
    <p className="mt-2 max-w-sm font-['Plus_Jakarta_Sans'] text-sm text-[#6B675C]">
      Once your bowls are planned, they'll show up here as a day-by-day timeline.
    </p>
  </div>
);

/* --------------------------------- hero ------------------------------------ */

const HeroDetail = ({ label, value }) => (
  <div>
    <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-wider text-white/55">
      {label}
    </p>
    <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm font-medium text-white/95">
      {value || "—"}
    </p>
  </div>
);

const Hero = ({ subscription }) => {
  const { planId, status, startDate, deliveryPattern, deliverySlotId, deliveryAddress, paymentStatus, paymentDate } =
    subscription;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#1F2E1A] px-6 py-10 shadow-[0_30px_80px_-25px_rgba(31,46,26,0.55)] sm:px-10 sm:py-14">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C9A24B, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #3F6B3F, transparent 70%)" }}
      />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]">
              The Little Food Box
            </p>
            <h1 className="mt-3 font-['Fraunces'] text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {planId?.name || "Your Plan"}
            </h1>
            <p className="mt-2 font-['JetBrains_Mono'] text-lg text-[#C9A24B]">
              ₹{planId?.price ?? "—"}{" "}
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-normal text-white/50">
                / {planId?.validity || "plan"}
              </span>
            </p>
          </div>
          {/* <Badge status={status} /> */}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-4">
          <HeroDetail label="Start Date" value={formatDate(startDate)} />
          <HeroDetail label="Delivery Pattern" value={deliveryPattern} />
          <HeroDetail
            label="Delivery Slot"
            value={
              deliverySlotId
                ? `${deliverySlotId.shift} · ${formatTime(deliverySlotId.startTime)} – ${formatTime(
                    deliverySlotId.endTime
                  )}`
                : "—"
            }
          />
          <HeroDetail label="Units" value={planId?.units} />
<HeroDetail
  label="Address"
  value={
    deliveryAddress
      ? `${deliveryAddress.fullName}
${deliveryAddress.house}, ${deliveryAddress.street}
${deliveryAddress.landmark}
${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}`
      : "—"
  }
/>          <HeroDetail
            label="Payment"
            value={
              <span className="inline-flex items-center gap-2">
                {paymentStatus}
                <span className="text-white/40">· {formatDate(paymentDate)}</span>
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

/* ------------------------------- progress ---------------------------------- */

// const ProgressSection = ({ mealSelections }) => {
//   const total = mealSelections.length;
//   const completed = mealSelections.filter((m) =>
//     ["delivered", "completed"].includes((m.status || "").toLowerCase())
//   ).length;
//   const remaining = total - completed;
//   const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

//   return (
//     <div className="rounded-[2rem] border border-[#3F6B3F]/10 bg-white/80 p-8 shadow-[0_10px_40px_-20px_rgba(31,46,26,0.2)] backdrop-blur-sm sm:p-10">
//       <div className="flex flex-wrap items-end justify-between gap-6">
//         <div>
//           <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#1F2E1A]">Your progress</h2>
//           <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm text-[#6B675C]">
//             {completed} of {total} meals delivered
//           </p>
//         </div>
//         <div className="text-right">
//           <span className="font-['JetBrains_Mono'] text-4xl font-bold text-[#3F6B3F]">{pct}%</span>
//         </div>
//       </div>

//       <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-[#EFEDE6]">
//         <div
//           className="h-full rounded-full bg-gradient-to-r from-[#3F6B3F] to-[#6E9B57] transition-all duration-700 ease-out"
//           style={{ width: `${pct}%` }}
//         />
//       </div>

//       <div className="mt-8 grid grid-cols-2 gap-4 sm:w-2/3">
//         <div className="rounded-2xl bg-[#EAF2E5] px-5 py-4">
//           <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-wider text-[#3F6B3F]">
//             Completed
//           </p>
//           <p className="mt-1 font-['JetBrains_Mono'] text-2xl font-bold text-[#1F2E1A]">{completed}</p>
//         </div>
//         <div className="rounded-2xl bg-[#FBF1DD] px-5 py-4">
//           <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-wider text-[#9A7615]">
//             Remaining
//           </p>
//           <p className="mt-1 font-['JetBrains_Mono'] text-2xl font-bold text-[#1F2E1A]">{remaining}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

/* --------------------------- nutrition label block --------------------------- */

const NutritionFact = ({ label, value, unit }) => (
  <div className="flex items-baseline justify-between border-b border-[#1F2E1A]/10 py-1.5 last:border-b-0">
    <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#6B675C]">{label}</span>
    <span className="font-['JetBrains_Mono'] text-sm font-semibold text-[#1F2E1A]">
      {value ?? "—"}
      {value != null && unit ? <span className="ml-0.5 text-[10px] text-[#6B675C]">{unit}</span> : null}
    </span>
  </div>
);

const NutritionPanel = ({ salad }) => (
  <div className="rounded-2xl border-2 border-[#1F2E1A] bg-[#FCFBF6] p-4">
    <p className="border-b-2 border-[#1F2E1A] pb-1 font-['Fraunces'] text-sm font-bold uppercase tracking-wide text-[#1F2E1A]">
      Nutrition Facts
    </p>
    <div className="mt-2">
      <NutritionFact label="Calories" value={salad?.calories} unit="kcal" />
      <NutritionFact label="Protein" value={salad?.protein} unit="g" />
      <NutritionFact label="Carbs" value={salad?.carbs} unit="g" />
      <NutritionFact label="Fat" value={salad?.fat} unit="g" />
    </div>
  </div>
);

/* --------------------------------- meal card --------------------------------- */

const MealCard = ({ meal, }) => {
  const { salad, deliverySlotId } = meal;

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#1F2E1A]/8 bg-white shadow-[0_15px_50px_-25px_rgba(31,46,26,0.3)] transition hover:shadow-[0_25px_60px_-20px_rgba(31,46,26,0.35)]">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
          {salad?.image ? (
            <img
              src={salad.image}
              alt={salad?.name || "Salad bowl"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#EAF2E5] text-[#3F6B3F]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 13c1 1.5 2.5 2 4 2s3-.5 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
          <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2E1A]/85 backdrop-blur-sm">
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-white">#{meal.mealNo}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-wider text-[#6B675C]">
                {meal.day} · {formatDate(meal.date)}
              </p>
              <h3 className="mt-1 font-['Fraunces'] text-xl font-semibold text-[#1F2E1A]">
                {salad?.name || "Bowl selection pending"}
              </h3>
            </div>
            {/* <Badge status={meal.status} /> */}
          </div>

          {salad?.description && (
            <p className="mt-2 font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-[#6B675C]">
              {salad.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {meal.variant && (
              <span className="rounded-full bg-[#EAF2E5] px-3 py-1 font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#3F6B3F]">
                {meal.variant}
              </span>
            )}
            {meal.dressing && (
              <span className="rounded-full bg-[#FBF1DD] px-3 py-1 font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#9A7615]">
                {meal.dressing} dressing
              </span>
            )}
            {meal.vegan && (
              <span className="rounded-full bg-[#EAF2E5] px-3 py-1 font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#3F6B3F]">
                Vegan
              </span>
            )}
            {meal.jain && (
              <span className="rounded-full bg-[#EAF2E5] px-3 py-1 font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#3F6B3F]">
                Jain
              </span>
            )}
          </div>

          {salad?.ingredients?.length > 0 && (
            <div className="mt-4">
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-wider text-[#6B675C]">
                Ingredients
              </p>
              <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm text-[#3F3D34]">
                {salad.ingredients.join(", ")}
              </p>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm text-[#6B675C]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 7v5l3 3M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {deliverySlotId
              ? `${deliverySlotId.shift} · ${formatTime(deliverySlotId.startTime)} – ${formatTime(deliverySlotId.endTime)}`
              : "Delivery time unset"}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="max-w-[240px]">
              <NutritionPanel salad={salad} />
            </div>
            <div className="flex flex-col justify-end gap-2 sm:items-end">
             
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- subscription actions ----------------------------- */

const ActionButton = ({ label, description, onClick, variant = "default" }) => {
  const variants = {
    default: "border border-[#1F2E1A]/15 bg-white text-[#1F2E1A] hover:bg-[#F6F4EC]",
    primary: "bg-[#1F2E1A] text-white hover:bg-[#3F6B3F]",
    danger: "border border-[#B4502E]/30 bg-white text-[#B4502E] hover:bg-[#FBEAE4]",
  };
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex flex-col items-start gap-1 rounded-2xl px-6 py-5 text-left transition",
        variants[variant]
      )}
    >
      <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold">{label}</span>
      <span className="font-['Plus_Jakarta_Sans'] text-xs opacity-70">{description}</span>
    </button>
  );
};

// const SubscriptionActions = ({ status, onPause, onResume, onCancel }) => {
//   const isPaused = (status || "").toLowerCase() === "paused";

//   return (
//     <div className="rounded-[2rem] border border-[#1F2E1A]/8 bg-white/80 p-8 shadow-[0_10px_40px_-20px_rgba(31,46,26,0.2)] sm:p-10">
//       <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#1F2E1A]">Manage your box</h2>
//       <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm text-[#6B675C]">
//         Pause, resume, or cancel this subscription anytime.
//       </p>
//       <div className="mt-6 grid gap-4 sm:grid-cols-3">
//         {isPaused ? (
//           <ActionButton
//             label="Resume subscription"
//             description="Pick up right where you left off."
//             variant="primary"
//             onClick={onResume}
//           />
//         ) : (
//           <ActionButton
//             label="Pause subscription"
//             description="Take a break, restart whenever you're ready."
//             onClick={onPause}
//           />
//         )}
//         <ActionButton
//           label="Cancel subscription"
//           description="Stop future deliveries permanently."
//           variant="danger"
//           onClick={onCancel}
//         />
//       </div>
//     </div>
//   );
// };

/* ------------------------------------ page ------------------------------------ */

const ManageSubscription = () => {
  useFonts();
  const { id } = useParams();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscription = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/subscriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Unable to fetch subscription");
      }

      setSubscription(data.subscription);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  /* ---------- placeholder handlers (future ready) ---------- */



  
  const onPause = () => {
    console.log("onPause called for subscription:", id);
    // TODO: call PATCH /api/subscriptions/:id/pause
  };

  const onResume = () => {
    console.log("onResume called for subscription:", id);
    // TODO: call PATCH /api/subscriptions/:id/resume
  };

  const onCancel = () => {
    console.log("onCancel called for subscription:", id);
    // TODO: call PATCH /api/subscriptions/:id/cancel
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={fetchSubscription} />;
  if (!subscription) return <ErrorState message="Subscription not found." onRetry={fetchSubscription} />;

  const mealSelections = subscription.mealSelections || [];

  return (
    <div className="min-h-screen bg-[#F6F4EC] px-4 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <Hero subscription={subscription} />

        {/* <ProgressSection mealSelections={mealSelections} /> */}

        <div>
          <h2 className="mb-6 font-['Fraunces'] text-2xl font-semibold text-[#1F2E1A]">Your meals</h2>
          {mealSelections.length === 0 ? (
            <EmptyMeals />
          ) : (
            <div className="space-y-6">
              {mealSelections.map((meal) => (
                <MealCard
                  key={meal._id || `${meal.mealNo}-${meal.date}`}
                  meal={meal}
                />
              ))}
            </div>
          )}
        </div>

        {/* <SubscriptionActions
          status={subscription.status}
          onPause={onPause}
          onResume={onResume}
          onCancel={onCancel}
        /> */}
      </div>
    </div>
  );
};

export default ManageSubscription;