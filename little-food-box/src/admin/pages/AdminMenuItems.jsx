import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ImageIcon,
  Loader2,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menuItemApi"; // adjust path/names to match your project structure
import MenuItemModal from "./MenuItemModal";

export default function AdminMenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [itemPendingDelete, setItemPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchMenuItems = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const data = await getMenuItems();
      setMenuItems(Array.isArray(data) ? data : data?.menuItems || []);
    } catch (err) {
      setLoadError(
        err?.message || "Couldn't load menu items. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return menuItems;
    return menuItems.filter((item) =>
  item.name?.toLowerCase().includes(term) ||
  item.category?.toLowerCase().includes(term) ||
  item.section?.toLowerCase().includes(term)
);
  }, [menuItems, searchTerm]);

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Called by MenuItemModal on submit. Throws on failure so the modal can show the error inline.
 const handleSaveItem = async (payload, id) => {
  if (id) {
    await updateMenuItem(id, payload);
    showToast("success", "Dish updated successfully");
  } else {
    await createMenuItem(payload);
    showToast("success", "Dish added successfully");
  }

  await fetchMenuItems();
};

  const confirmDelete = (item) => setItemPendingDelete(item);
  const cancelDelete = () => setItemPendingDelete(null);

  const handleDelete = async () => {
    if (!itemPendingDelete) return;
    setIsDeleting(true);
    try {
      await deleteMenuItem(itemPendingDelete._id);
      showToast("success", `"${itemPendingDelete.name}" was deleted`);
      setItemPendingDelete(null);
      await fetchMenuItems();
    } catch (err) {
      showToast("error", err?.message || "Couldn't delete this dish. Try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-800">Menu Items</h1>
            <p className="text-sm text-stone-500 mt-0.5">
              Manage the dishes shown across your menu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by dish name..."
                className="pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-800 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
              />
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
            >
              <Plus size={16} />
              Add Dish
            </button>
          </div>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          {isLoading ? (
            <LoadingState />
          ) : loadError ? (
            <ErrorState message={loadError} onRetry={fetchMenuItems} />
          ) : filteredItems.length === 0 ? (
            <EmptyState hasSearch={Boolean(searchTerm.trim())} onAdd={openAddModal} />
          ) : (
            <MenuItemsTable
              items={filteredItems}
              onEdit={openEditModal}
              onDelete={confirmDelete}
            />
          )}
        </div>
      </div>

      {/* Add / Edit modal */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveItem}
        initialData={editingItem}
      />

      {/* Delete confirmation */}
      {itemPendingDelete && (
        <DeleteConfirmModal
          item={itemPendingDelete}
          isDeleting={isDeleting}
          onCancel={cancelDelete}
          onConfirm={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
            toast.type === "success" ? "bg-emerald-700" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function MenuItemsTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50/60">
            <th className="text-left font-medium text-stone-500 px-5 py-3 w-20">
              Image
            </th>
            <th className="text-left font-medium text-stone-500 px-5 py-3">
              Dish Name
            </th>
            <th className="text-left font-medium text-stone-500 px-5 py-3">
              Category
            </th>
            <th className="text-left font-medium text-stone-500 px-5 py-3">
              Section
            </th>
            <th className="text-left font-medium text-stone-500 px-5 py-3">
              Price
            </th>
            <th className="text-left font-medium text-stone-500 px-5 py-3">
              Available
            </th>
            <th className="text-right font-medium text-stone-500 px-5 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item._id}
              className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60 transition-colors"
            >
              <td className="px-5 py-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={18} className="text-stone-400" />
                  )}
                </div>
              </td>
              <td className="px-5 py-3 font-medium text-stone-800">
                {item.name}
              </td>
              <td className="px-5 py-3 text-stone-600">{item.category}</td>
              <td className="px-5 py-3 text-stone-600">{item.section}</td>
              <td className="px-5 py-3 text-stone-800">
                {isNaN(Number(item.price))
  ? item.price
  : `₹${Number(item.price).toLocaleString()}`}
              </td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-emerald-700 transition-colors"
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 rounded-lg text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-stone-500">
      <Loader2 size={28} className="animate-spin mb-3 text-emerald-700" />
      <p className="text-sm">Loading menu items...</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <AlertTriangle size={28} className="text-red-500 mb-3" />
      <p className="text-sm text-stone-700 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

function EmptyState({ hasSearch, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-4">
        <ImageIcon size={22} className="text-stone-400" />
      </div>
      {hasSearch ? (
        <>
          <p className="text-sm font-medium text-stone-700">No dishes match your search</p>
          <p className="text-sm text-stone-500 mt-1">
            Try a different name, or clear the search box.
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-stone-700">No dishes yet</p>
          <p className="text-sm text-stone-500 mt-1 mb-4">
            Add your first dish to get the menu started.
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            <Plus size={16} />
            Add Dish
          </button>
        </>
      )}
    </div>
  );
}

function DeleteConfirmModal({ item, isDeleting, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={18} className="text-red-600" />
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <h3 className="text-base font-semibold text-stone-800">Delete this dish?</h3>
        <p className="text-sm text-stone-500 mt-1.5">
          <span className="font-medium text-stone-700">"{item.name}"</span> will be
          permanently removed from your menu. This can't be undone.
        </p>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {isDeleting && <Loader2 size={14} className="animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}