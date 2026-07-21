import { useEffect, useState } from "react";

import PlanModal from "../components/PlanModal";
import DeliverySlotModal from "../components/DeliverySlotModal";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../services/planApi";
import {
  getSlots,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../services/deliverySlotApi";
import { formatTime } from "../../utils/time";
export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotOpen, setSlotOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
const [loadingPlans, setLoadingPlans] = useState(true);
  // ================= LOAD PLANS =================

  const loadPlans = async (retry = 0) => {
  try {
    setLoadingPlans(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subscription-plans`
    );

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();

    if (data.success) {
      setPlans(data.plans.filter((p) => p.active));
      setLoadingPlans(false);
      return;
    }

    throw new Error("No plans");
  } catch (err) {
    console.log("Retry:", retry);

    if (retry < 5) {
      setTimeout(() => loadPlans(retry + 1), 3000);
    } else {
      setLoadingPlans(false);
      console.error(err);
    }
  }
};

  const loadSlots = async () => {
    try {
      const data = await getSlots();

      if (data.success) {
        setSlots(data.slots);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveSlot = async (form) => {
    let data;

    if (editingSlot) {
      data = await updateSlot(editingSlot._id, form);
    } else {
      data = await createSlot(form);
    }

    if (data.success) {
      alert(editingSlot ? "Slot Updated" : "Slot Created");

      setSlotOpen(false);
      setEditingSlot(null);

      loadSlots();
    } else {
      alert(data.message);
    }
  };

  const editSlot = (slot) => {
    setEditingSlot(slot);
    setSlotOpen(true);
  };

  const removeSlot = async (id) => {
    if (!window.confirm("Delete this delivery slot?")) return;

    const data = await deleteSlot(id);

    if (data.success) {
      loadSlots();
    }
  };

  useEffect(() => {
    loadPlans();
    loadSlots();
  }, []);

  // ================= SAVE =================

  const savePlan = async (form) => {
    let data;

    if (editingPlan) {
      data = await updatePlan(editingPlan._id, form);
    } else {
      data = await createPlan(form);
    }

    if (data.success) {
      alert(editingPlan ? "Plan Updated" : "Plan Created");

      setOpen(false);
      setEditingPlan(null);

      loadPlans();
    } else {
      alert(data.message);
    }
  };

  // ================= EDIT =================

  const editPlan = (plan) => {
    setEditingPlan(plan);
    setOpen(true);
  };

  // ================= DELETE =================

  const removePlan = async (id) => {
    const ok = window.confirm(
      "Delete this subscription plan?"
    );

    if (!ok) return;

    const data = await deletePlan(id);

    if (data.success) {
      alert("Deleted Successfully");
      loadPlans();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F3] via-[#F5F2EA] to-[#EEF2E9] p-4 md:p-10 text-[#2A2A28]">

      <div className="mx-auto max-w-6xl">

        {/* ================= SUBSCRIPTION PLANS ================= */}
        <section className="rounded-3xl border border-[#ECE8DC] bg-white p-4 shadow-[0_2px_10px_rgba(42,42,40,0.05)] sm:p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9B57]">
                Catalog
              </p>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2A2A28] md:text-3xl">
                Subscription Plans
              </h1>
              <p className="mt-1 text-sm text-[#8A8A82]">
                Manage the plans your customers can subscribe to
              </p>
            </div>

            <button
              onClick={() => {
                setEditingPlan(null);
                setOpen(true);
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#3F6C51] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#345a43] hover:shadow-md active:translate-y-px sm:w-auto sm:justify-start sm:self-auto"
            >
              <span className="text-base leading-none">+</span>
              Add Plan
            </button>
          </div>

          {/* Empty state (shared) */}
          {plans.length === 0 && (
            <div className="rounded-2xl border border-[#ECE8DC] px-4 py-12 text-center">
              <div className="mb-2 text-3xl">📦</div>
              <p className="mb-1 text-[15px] font-semibold text-[#4A4A45]">
                No plans yet
              </p>
              <p className="text-[13px] text-[#9A9A92]">
                Create your first subscription plan to get started.
              </p>
            </div>
          )}

          {/* Mobile / tablet: card list (hidden on lg+) */}
          {plans.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="rounded-2xl border border-[#ECE8DC] p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-[#2A2A28]">
                      {plan.name}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        Units
                      </div>
                      <div className="text-[#4A4A45]">{plan.units}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        Validity
                      </div>
                      <div className="text-[#4A4A45]">
                        {plan.validity} Days
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        Price
                      </div>
                      <div className="text-[#4A4A45]">₹ {plan.price}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        Price / Unit
                      </div>
                      <div className="text-[#4A4A45]">
                        ₹ {plan.pricePerUnit}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1 text-[11px] uppercase tracking-wide text-[#9A9A92]">
                      Delivery Pattern
                    </div>
                    {plan.deliveryPatterns?.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {plan.deliveryPatterns.map((pattern, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-[#DCE8D4] bg-[#EAF2E7] px-2.5 py-0.5 text-xs font-medium text-[#3F6C51]"
                          >
                            {pattern}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#C4C4BB]">—</span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => editPlan(plan)}
                      className="flex-1 rounded-lg border border-[#CBD9E8] bg-[#EEF3F9] px-3.5 py-2 text-xs font-semibold text-[#3A6EA5] transition-colors hover:border-[#B4C9E0] hover:bg-[#E2EAF4]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removePlan(plan._id)}
                      className="flex-1 rounded-lg border border-[#F0D3CC] bg-[#FBEAE7] px-3.5 py-2 text-xs font-semibold text-[#C0503F] transition-colors hover:border-[#E8BFB5] hover:bg-[#F7DDD6]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop: table (hidden below lg) */}
          {plans.length > 0 && (
            <div className="hidden overflow-x-auto rounded-2xl border border-[#ECE8DC] lg:block">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead className="bg-[#FAF8F3]">
                  <tr>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Name
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Units
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Validity
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Price
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Price / Unit
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Delivery Pattern
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-right text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {plans.map((plan) => (
                    <tr
                      key={plan._id}
                      className="transition-colors hover:bg-[#FAF8F3]"
                    >
                      <td className="border-b border-[#F3F1E9] px-4 py-4 font-semibold text-[#2A2A28]">
                        {plan.name}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
                        {plan.units}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
                        {plan.validity} Days
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
                        ₹ {plan.price}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
                        ₹ {plan.pricePerUnit}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4">
                        {plan.deliveryPatterns?.length ? (
                          <div className="flex flex-wrap gap-1.5">
                            {plan.deliveryPatterns.map((pattern, idx) => (
                              <span
                                key={idx}
                                className="rounded-full border border-[#DCE8D4] bg-[#EAF2E7] px-2.5 py-0.5 text-xs font-medium text-[#3F6C51]"
                              >
                                {pattern}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[#C4C4BB]">—</span>
                        )}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => editPlan(plan)}
                            className="rounded-lg border border-[#CBD9E8] bg-[#EEF3F9] px-3.5 py-1.5 text-xs font-semibold text-[#3A6EA5] transition-colors hover:border-[#B4C9E0] hover:bg-[#E2EAF4]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removePlan(plan._id)}
                            className="rounded-lg border border-[#F0D3CC] bg-[#FBEAE7] px-3.5 py-1.5 text-xs font-semibold text-[#C0503F] transition-colors hover:border-[#E8BFB5] hover:bg-[#F7DDD6]"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ================= DELIVERY SLOTS ================= */}
        <section className="mt-7 rounded-3xl border border-[#ECE8DC] bg-white p-4 shadow-[0_2px_10px_rgba(42,42,40,0.05)] sm:p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6BAE]">
                Logistics
              </p>
              <h2 className="font-serif text-xl font-bold tracking-tight text-[#2A2A28] md:text-2xl">
                Delivery Slots
              </h2>
              <p className="mt-1 text-sm text-[#8A8A82]">
                Configure the time windows available for deliveries
              </p>
            </div>

            <button
              onClick={() => {
                setEditingSlot(null);
                setSlotOpen(true);
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#3F6C51] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#345a43] hover:shadow-md active:translate-y-px sm:w-auto sm:justify-start sm:self-auto"
            >
              <span className="text-base leading-none">+</span>
              Add Slot
            </button>
          </div>

          {/* Empty state (shared) */}
          {slots.length === 0 && (
            <div className="rounded-2xl border border-[#ECE8DC] px-4 py-12 text-center">
              <div className="mb-2 text-3xl">🚚</div>
              <p className="mb-1 text-[15px] font-semibold text-[#4A4A45]">
                No delivery slots yet
              </p>
              <p className="text-[13px] text-[#9A9A92]">
                Add a slot to define when deliveries can be made.
              </p>
            </div>
          )}

          {/* Mobile / tablet: card list (hidden on lg+) */}
          {slots.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {slots.map((slot) => (
                <div
                  key={slot._id}
                  className="rounded-2xl border border-[#ECE8DC] p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-[#2A2A28]">
                      {slot.shift}
                    </div>

                    <span
                      className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        slot.active
                          ? "bg-[#EAF2E7] text-[#3F6C51]"
                          : "bg-[#F1F0EA] text-[#8A8A82]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          slot.active ? "bg-[#3F6C51]" : "bg-[#B5B5AB]"
                        }`}
                      />
                      {slot.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2 text-sm">
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        Start
                      </div>
                      <div className="text-[#4A4A45]">{formatTime(slot.startTime)}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        End
                      </div>
                      <div className="text-[#4A4A45]">{formatTime(slot.endTime)}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[#9A9A92]">
                        Sort
                      </div>
                      <div className="text-[#4A4A45]">{slot.sortOrder}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => editSlot(slot)}
                      className="flex-1 rounded-lg border border-[#CBD9E8] bg-[#EEF3F9] px-3.5 py-2 text-xs font-semibold text-[#3A6EA5] transition-colors hover:border-[#B4C9E0] hover:bg-[#E2EAF4]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeSlot(slot._id)}
                      className="flex-1 rounded-lg border border-[#F0D3CC] bg-[#FBEAE7] px-3.5 py-2 text-xs font-semibold text-[#C0503F] transition-colors hover:border-[#E8BFB5] hover:bg-[#F7DDD6]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop: table (hidden below lg) */}
          {slots.length > 0 && (
            <div className="hidden overflow-x-auto rounded-2xl border border-[#ECE8DC] lg:block">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead className="bg-[#FAF8F3]">
                  <tr>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Shift
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Start
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      End
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Status
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Sort Order
                    </th>
                    <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-right text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {slots.map((slot) => (
                    <tr
                      key={slot._id}
                      className="transition-colors hover:bg-[#FAF8F3]"
                    >
                      <td className="border-b border-[#F3F1E9] px-4 py-4 font-semibold text-[#2A2A28]">
                        {slot.shift}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
{formatTime(slot.startTime)}                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
                        {formatTime(slot.endTime)}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            slot.active
                              ? "bg-[#EAF2E7] text-[#3F6C51]"
                              : "bg-[#F1F0EA] text-[#8A8A82]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              slot.active ? "bg-[#3F6C51]" : "bg-[#B5B5AB]"
                            }`}
                          />
                          {slot.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-[#4A4A45]">
                        {slot.sortOrder}
                      </td>
                      <td className="border-b border-[#F3F1E9] px-4 py-4 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => editSlot(slot)}
                            className="rounded-lg border border-[#CBD9E8] bg-[#EEF3F9] px-3.5 py-1.5 text-xs font-semibold text-[#3A6EA5] transition-colors hover:border-[#B4C9E0] hover:bg-[#E2EAF4]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeSlot(slot._id)}
                            className="rounded-lg border border-[#F0D3CC] bg-[#FBEAE7] px-3.5 py-1.5 text-xs font-semibold text-[#C0503F] transition-colors hover:border-[#E8BFB5] hover:bg-[#F7DDD6]"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <PlanModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingPlan(null);
          }}
          onSave={savePlan}
          editingPlan={editingPlan}
        />
        <DeliverySlotModal
          open={slotOpen}
          editingSlot={editingSlot}
          onClose={() => {
            setSlotOpen(false);
            setEditingSlot(null);
          }}
          onSave={saveSlot}
        />

      </div>

    </div>
  );
}