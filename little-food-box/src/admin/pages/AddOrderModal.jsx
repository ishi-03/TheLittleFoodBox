import { useState, useEffect } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import AddOrderItemModal from "./AddOrderItemModal";

const EMPTY_ORDER = {
  customerName: "",
  customerPhone: "",
  deliveryAddress: "",
  deliveryDate: "",
  deliveryTime: "",
  paymentStatus: "Pending",
  paymentMode: "Cash",
  orderStatus: "Pending",
  orderNotes: "",
};

/**
 * AddOrderModal
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - onSave: (payload, id?) => Promise<void>  // throws on failure
 * - initialData: existing order when editing, null when adding
 * - menuItems: array of menu items from the DB, passed down to item picker
 */
export default function AddOrderModal({ isOpen, onClose, onSave, initialData, menuItems }) {
  const [form, setForm] = useState(EMPTY_ORDER);
  const [items, setItems] = useState([]);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const isEditMode = Boolean(initialData?._id);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setForm({
        customerName: initialData.customerName ?? "",
        customerPhone: initialData.customerPhone ?? "",
        deliveryAddress: initialData.deliveryAddress ?? "",
        deliveryDate: initialData.deliveryDate
          ? initialData.deliveryDate.slice(0, 10)
          : "",
        deliveryTime: initialData.deliveryTime ?? "",
        paymentStatus: initialData.paymentStatus ?? "Pending",
        paymentMode: initialData.paymentMode ?? "Cash",
        orderStatus: initialData.orderStatus ?? "Pending",
        orderNotes: initialData.orderNotes ?? "",
      });
      setItems(initialData.items || []);
    } else {
      setForm(EMPTY_ORDER);
      setItems([]);
    }
    setErrors({});
    setSaveError("");
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

const addItemLine = (line) =>
  setItems((prev) => {
    const matchIndex = prev.findIndex(
      (item) =>
        item.menuItem === line.menuItem &&
        item.notes === line.notes &&
        JSON.stringify(item.selectedCustomizations) ===
          JSON.stringify(line.selectedCustomizations)
    );

    // Same item + same customization + same notes → merge, quantity badhao
    if (matchIndex !== -1) {
      return prev.map((item, i) =>
        i === matchIndex
          ? { ...item, quantity: item.quantity + line.quantity }
          : item
      );
    }

    // Alag customization/notes hai to naya line banega (correctly)
    return [...prev, line];
  });
  const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const changeQty = (idx, delta) =>
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  const totalCount = items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);

  const validate = () => {
    const nextErrors = {};
    if (!form.customerName.trim()) nextErrors.customerName = "Naam required hai";
    if (!form.customerPhone.trim()) nextErrors.customerPhone = "Phone required hai";
    if (!form.deliveryDate) nextErrors.deliveryDate = "Delivery date required hai";
    if (items.length === 0) nextErrors.items = "Kam se kam ek item add karo";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    if (!validate()) return;

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        items,
        totalAmount,
      };
      await onSave(payload, initialData?._id);
      onClose();
    } catch (err) {
      setSaveError(err?.message || "Order save karte waqt kuch gadbad ho gayi.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FBF9F4] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 sticky top-0 bg-[#FBF9F4] rounded-t-2xl z-10">
          <h2 className="text-xl font-semibold text-stone-800">
            {isEditMode ? "Edit Order" : "Add Order"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-200/70 hover:text-stone-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6 overflow-y-auto">
          {saveError && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {saveError}
            </div>
          )}

          {/* Customer details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => updateField("customerName", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              />
              {errors.customerName && (
                <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={form.customerPhone}
                onChange={(e) => updateField("customerPhone", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              />
              {errors.customerPhone && (
                <p className="text-xs text-red-600 mt-1">{errors.customerPhone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Delivery Address
            </label>
            <input
              type="text"
              value={form.deliveryAddress}
              onChange={(e) => updateField("deliveryAddress", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Delivery Date
              </label>
              <input
                type="date"
                value={form.deliveryDate}
                onChange={(e) => updateField("deliveryDate", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              />
              {errors.deliveryDate && (
                <p className="text-xs text-red-600 mt-1">{errors.deliveryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Delivery Time
              </label>
              <input
                type="time"
                value={form.deliveryTime}
                onChange={(e) => updateField("deliveryTime", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Payment Status
              </label>
              <select
                value={form.paymentStatus}
                onChange={(e) => updateField("paymentStatus", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Payment Mode
              </label>
              <select
                value={form.paymentMode}
                onChange={(e) => updateField("paymentMode", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Online</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Order Status
              </label>
              <select
                value={form.orderStatus}
                onChange={(e) => updateField("orderStatus", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Prepared</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-stone-700">Order Items</span>
              <button
                type="button"
                onClick={() => setIsItemModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition-colors"
              >
                <Plus size={14} /> Add Item
              </button>
            </div>

            {errors.items && (
              <p className="text-xs text-red-600 mb-2">{errors.items}</p>
            )}

            {items.length === 0 ? (
              <p className="text-sm text-stone-500 border border-dashed border-stone-300 rounded-xl px-4 py-6 text-center">
                No items added yet. Click "Add Item" to include dishes in this order.
              </p>
            ) : (
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 bg-white border border-stone-200 rounded-xl px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-800">{item.name}</p>
                      {item.selectedCustomizations?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.selectedCustomizations.map((c, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600"
                            >
                              {c.groupTitle}: {c.selectedOptions.join(", ")}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.notes && (
                        <p className="text-xs text-stone-500 mt-1 italic">
                          Note: {item.notes}
                        </p>
                      )}
                      <p className="text-xs text-stone-500 mt-1">
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => changeQty(idx, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-stone-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-medium text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQty(idx, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-stone-100"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 ml-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Order Notes (optional)
            </label>
            <textarea
              rows={2}
              value={form.orderNotes}
              onChange={(e) => updateField("orderNotes", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
            />
          </div>
        </form>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-[#FBF9F4] border-t border-stone-200 px-6 py-4 rounded-b-2xl flex items-center justify-between">
          <div className="text-sm text-stone-600">
            <span className="font-semibold text-stone-800">{totalCount} item(s)</span>
            {"  "}·{"  "}
            <span className="font-semibold text-stone-800">₹{totalAmount}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors disabled:opacity-60"
            >
              {isSaving ? "Saving..." : isEditMode ? "Update Order" : "Save Order"}
            </button>
          </div>
        </div>
      </div>

      <AddOrderItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        menuItems={menuItems}
        onAdd={addItemLine}
      />
    </div>
  );
}