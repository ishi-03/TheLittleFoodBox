import { useState, useMemo, useEffect } from "react";
import { X, Search, ArrowLeft, Plus, Minus } from "lucide-react";

/**
 * AddOrderItemModal
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - menuItems: array of menu items from the DB (getMenuItems)
 * - onAdd: (orderItemLine) => void
 */
export default function AddOrderItemModal({ isOpen, onClose, menuItems, onAdd }) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selections, setSelections] = useState({}); // { groupIndex: [options] }
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedItem(null);
      setSelections({});
      setNotes("");
      setQuantity(1);
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    const available = (menuItems || []).filter((mi) => mi.isAvailable !== false);
    if (!term) return available;
    return available.filter(
      (mi) =>
        mi.name?.toLowerCase().includes(term) ||
        mi.category?.toLowerCase().includes(term) ||
        mi.section?.toLowerCase().includes(term)
    );
  }, [menuItems, search]);

  if (!isOpen) return null;

  const selectItem = (item) => {
    setSelectedItem(item);
    setSelections({});
    setNotes("");
    setQuantity(1);
  };

  const toggleOption = (groupIdx, maxSelect, option) => {
    setSelections((prev) => {
      const current = prev[groupIdx] || [];
      const isSelected = current.includes(option);

      if (isSelected) {
        return { ...prev, [groupIdx]: current.filter((o) => o !== option) };
      }

      // Radio-style behaviour when only 1 pick is allowed
      if (maxSelect === 1) {
        return { ...prev, [groupIdx]: [option] };
      }

      if (current.length >= maxSelect) return prev; // limit reached, ignore

      return { ...prev, [groupIdx]: [...current, option] };
    });
  };

  const handleAdd = () => {
    if (!selectedItem) return;

    const selectedCustomizations = (selectedItem.customizationGroups || [])
      .map((group, idx) => ({
        groupTitle: group.title,
        selectedOptions: selections[idx] || [],
      }))
      .filter((c) => c.selectedOptions.length > 0);

    onAdd({
      menuItem: selectedItem._id,
      name: selectedItem.name,
      price: Number(selectedItem.price) || 0,
      quantity,
      hasCustomization: Boolean(selectedItem.hasCustomization),
      selectedCustomizations,
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FBF9F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 sticky top-0 bg-[#FBF9F4] rounded-t-2xl z-10">
          <h2 className="text-lg font-semibold text-stone-800">
            {selectedItem ? selectedItem.name : "Add Item"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-200/70 hover:text-stone-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6">
          {!selectedItem ? (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Dish"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
                />
              </div>

              {/* Dropdown / list — live from menu DB */}
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <p className="text-sm text-stone-500 text-center py-8">
                    Koi dish nahi mila.
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => selectItem(item)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-stone-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/40 transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium text-stone-800">
                          {item.name}
                          {item.hasCustomization && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700">
                              Platter
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.category} • {item.section}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-stone-800 shrink-0">
                        ₹{item.price}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 mb-4"
              >
                <ArrowLeft size={15} /> Back to search
              </button>

              <p className="text-sm text-stone-500 mb-5">
                Base price:{" "}
                <span className="font-semibold text-stone-800">
                  ₹{selectedItem.price}
                </span>
              </p>

              {/* Customization groups — only for platters */}
              {selectedItem.hasCustomization &&
                (selectedItem.customizationGroups || []).map((group, idx) => (
                  <div key={idx} className="mb-5">
                    <p className="text-sm font-medium text-stone-700 mb-2">
                      {group.title}{" "}
                      <span className="text-xs font-normal text-stone-500">
                        (choose up to {group.maxSelect})
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(group.options || []).map((option) => {
                        const isSelected = (selections[idx] || []).includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleOption(idx, group.maxSelect, option)}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                              isSelected
                                ? "bg-emerald-700 border-emerald-700 text-white"
                                : "bg-white border-stone-300 text-stone-700 hover:border-emerald-600"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              {selectedItem.hasCustomization && (
                <div className="mb-5">
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Customization Notes (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Koi extra customization ho to yaha likho..."
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  />
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-stone-700">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
              >
                Add to Order — ₹{(Number(selectedItem.price) || 0) * quantity}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}