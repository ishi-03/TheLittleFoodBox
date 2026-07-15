import { useEffect, useState } from "react";

export default function PlanModal({
  open,
  onClose,
  onSave,
  editingPlan,
}) {
  const [form, setForm] = useState({
  name: "",
  description: "",
  units: "",
  validity: "",
  price: "",
  deliveryPatterns: [],
  active: true,
  sortOrder: 0,
  themeColor: "#4F6F52",
});

 useEffect(() => {
  if (editingPlan) {
    setForm({
      name: editingPlan.name || "",
      description: editingPlan.description || "",
      units: editingPlan.units || "",
      validity: editingPlan.validity || "",
      price: editingPlan.price || "",
      deliveryPatterns: editingPlan.deliveryPatterns || [],
      active:
        editingPlan.active === undefined
          ? true
          : editingPlan.active,
      sortOrder: editingPlan.sortOrder || 0,
      themeColor:
        editingPlan.themeColor || "#4F6F52",
    });
  } else {
    setForm({
      name: "",
      description: "",
      units: "",
      validity: "",
      price: "",
      deliveryPatterns: [],
      active: true,
      sortOrder: 0,
      themeColor: "#4F6F52",
    });
  }
}, [editingPlan, open]);
  if (!open) return null;

  const togglePattern = (pattern) => {
    if (form.deliveryPatterns.includes(pattern)) {
      setForm({
        ...form,
        deliveryPatterns: form.deliveryPatterns.filter(
          (p) => p !== pattern
        ),
      });
    } else {
      setForm({
        ...form,
        deliveryPatterns: [...form.deliveryPatterns, pattern],
      });
    }
  };

  const handleSave = () => {
    if (
      !form.name ||
      !form.units ||
      !form.validity ||
      !form.price
    ) {
      alert("Please fill all required fields");
      return;
    }

   onSave({
  ...form,
  units: Number(form.units),
  validity: Number(form.validity),
  price: Number(form.price),
  pricePerUnit:
    Number(form.price) / Number(form.units),
  sortOrder: Number(form.sortOrder),
  deliveryPatterns: form.deliveryPatterns,
});
  };

  const inputClass =
    "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-colors focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

  const labelClass = "block text-xs font-semibold text-stone-500 mb-1.5";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FDFBF7] p-6 sm:p-8 shadow-xl border border-stone-200/60">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-800 mb-6">
          {editingPlan ? "Edit Plan" : "Add Subscription Plan"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Plan Name</label>
            <input
              className={inputClass}
              placeholder="Plan Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              className={`${inputClass} resize-none`}
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className={labelClass}>Units</label>
            <input
              className={inputClass}
              type="number"
              placeholder="Units"
              value={form.units}
              onChange={(e) =>
                setForm({
                  ...form,
                  units: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className={labelClass}>Validity (Days)</label>
            <input
              className={inputClass}
              type="number"
              placeholder="Validity (Days)"
              value={form.validity}
              onChange={(e) =>
                setForm({
                  ...form,
                  validity: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className={labelClass}>Price</label>
            <input
              className={inputClass}
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className={labelClass}>Price Per Unit</label>
            <input
              readOnly
              placeholder="Price Per Unit"
              value={
                form.units && form.price
                  ? (
                      Number(form.price) /
                      Number(form.units)
                    ).toFixed(2)
                  : ""
              }
              className={`${inputClass} bg-stone-100 text-stone-500 cursor-not-allowed focus:ring-0 focus:border-stone-300`}
            />
          </div>

          <div>
            <label className={labelClass}>Sort Order</label>
            <input
              className={inputClass}
              type="number"
              placeholder="Sort Order"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({
                  ...form,
                  sortOrder: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className={labelClass}>Theme Color</label>
            <div className="flex items-center gap-3 rounded-lg border border-stone-300 bg-white px-3 py-2">
              <input
                type="color"
                value={form.themeColor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    themeColor: e.target.value,
                  })
                }
                className="h-8 w-10 cursor-pointer rounded border-none bg-transparent p-0"
              />
              <span className="text-sm text-stone-500 uppercase">
                {form.themeColor}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-stone-300 bg-white px-3.5 py-2.5">
            <span className="text-sm font-medium text-stone-700">Active</span>
            <button
              type="button"
              role="switch"
              aria-checked={form.active}
              onClick={() =>
                setForm({
                  ...form,
                  active: !form.active,
                })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                form.active ? "bg-emerald-800" : "bg-stone-300"
              }`}
            >
              <span
                className={`inline-block h-4.5 w-4.5 h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform ${
                  form.active ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Delivery Pattern</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => togglePattern("Daily")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
                  form.deliveryPatterns.includes("Daily")
                    ? "bg-emerald-800 border-emerald-800 text-white"
                    : "bg-white border-stone-300 text-stone-600 hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                Daily
              </button>

              <button
                type="button"
                onClick={() => togglePattern("Alternate Day")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
                  form.deliveryPatterns.includes("Alternate Day")
                    ? "bg-emerald-800 border-emerald-800 text-white"
                    : "bg-white border-stone-300 text-stone-600 hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                Alternate Day
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 active:translate-y-px transition-colors"
          >
            {editingPlan ? "Update Plan" : "Save Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}