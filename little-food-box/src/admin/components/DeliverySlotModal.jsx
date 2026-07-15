import { useEffect, useState } from "react";

const timeOptions = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const getEndTime = (start) => {
  const [hour] = start.split(":").map(Number);
  const end = (hour + 1) % 24;
  return `${String(end).padStart(2, "0")}:00`;
};

const formatTime = (time) => {
  const [hour] = time.split(":").map(Number);

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:00 ${period}`;
};

export default function DeliverySlotModal({
  open,
  onClose,
  onSave,
  editingSlot,
}) {
  const [form, setForm] = useState({
    startTime: "09:00",
    active: true,
    sortOrder: 1,
  });

  useEffect(() => {
    if (editingSlot) {
      setForm({
        startTime: editingSlot.startTime || "09:00",
        active:
          editingSlot.active === undefined
            ? true
            : editingSlot.active,
        sortOrder: editingSlot.sortOrder || 1,
      });
    } else {
      setForm({
        startTime: "09:00",
        active: true,
        sortOrder: 1,
      });
    }
  }, [editingSlot, open]);

  if (!open) return null;

  const handleSave = () => {
    onSave({
      startTime: form.startTime,
      endTime: getEndTime(form.startTime),
      active: form.active,
      sortOrder: Number(form.sortOrder),
    });
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-xl border border-stone-200/60 p-7">
        <h2 className="text-2xl font-semibold text-stone-800 mb-6">
          {editingSlot ? "Edit Delivery Slot" : "Add Delivery Slot"}
        </h2>

        <div className="space-y-5">
          {/* Delivery Slot */}
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-2">
              Delivery Slot
            </label>

            <select
              value={form.startTime}
              onChange={(e) =>
                setForm({
                  ...form,
                  startTime: e.target.value,
                })
              }
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {formatTime(time)} - {formatTime(getEndTime(time))}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-2">
              Sort Order
            </label>

            <input
              type="number"
              min="1"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({
                  ...form,
                  sortOrder: e.target.value,
                })
              }
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
            />
          </div>

          {/* Active */}
          <label className="flex items-center gap-3 cursor-pointer">
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

            <span className="text-sm text-stone-700 font-medium">
              Active Slot
            </span>
          </label>

          {/* Preview */}
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
            <p className="text-sm text-stone-500">Selected Slot</p>

            <p className="text-lg font-semibold text-emerald-800 mt-1">
              {formatTime(form.startTime)} -{" "}
              {formatTime(getEndTime(form.startTime))}
            </p>
          </div>
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