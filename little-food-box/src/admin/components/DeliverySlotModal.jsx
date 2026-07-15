import { useEffect, useState } from "react";

export default function DeliverySlotModal({
  open,
  onClose,
  onSave,
  editingSlot,
}) {
  const [form, setForm] = useState({
    shift: "Lunch",
    startTime: "",
    endTime: "",
    active: true,
    sortOrder: 1,
  });

  useEffect(() => {
    if (editingSlot) {
      setForm({
        shift: editingSlot.shift || "Lunch",
        startTime: editingSlot.startTime || "",
        endTime: editingSlot.endTime || "",
        active:
          editingSlot.active === undefined
            ? true
            : editingSlot.active,
        sortOrder: editingSlot.sortOrder || 1,
      });
    } else {
      setForm({
        shift: "Lunch",
        startTime: "",
        endTime: "",
        active: true,
        sortOrder: 1,
      });
    }
  }, [editingSlot, open]);

  if (!open) return null;

  const handleSave = () => {
    if (!form.startTime || !form.endTime) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      ...form,
      sortOrder: Number(form.sortOrder),
    });
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-xl border border-stone-200/60 p-7">
        <h2 className="text-2xl font-semibold text-stone-800 mb-6">
          {editingSlot ? "Edit Delivery Slot" : "Add Delivery Slot"}
        </h2>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">
              Shift
            </label>
            <select
              value={form.shift}
              onChange={(e) =>
                setForm({
                  ...form,
                  shift: e.target.value,
                })
              }
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
            >
              <option>Lunch</option>
              <option>Evening</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startTime: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endTime: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">
              Sort Order
            </label>
            <input
              type="number"
              placeholder="Sort Order"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({
                  ...form,
                  sortOrder: e.target.value,
                })
              }
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
            />
          </div>

          <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({
                  ...form,
                  active: e.target.checked,
                })
              }
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/30"
            />
            <span className="text-sm text-stone-700">Active</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-stone-600 font-medium hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-colors shadow-sm"
          >
            {editingSlot ? "Update Slot" : "Save Slot"}
          </button>
        </div>
      </div>
    </div>
  );
}