import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  X,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ChefHat,
} from "lucide-react";
import {
  getOrders,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderApi";
import { getMenuItems } from "../services/menuItemApi";
import AddOrderModal from "./AddOrderModal";

const ORDER_STATUSES = ["Pending", "Confirmed", "Prepared", "Delivered"];

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Prepared: "bg-purple-50 text-purple-700",
  Delivered: "bg-emerald-50 text-emerald-700",
};

const PAYMENT_STYLES = {
  Pending: "bg-amber-50 text-amber-700",
  Paid: "bg-emerald-50 text-emerald-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [orderPendingDelete, setOrderPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setLoadError(err?.message || "Orders not loading. Try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMenuItemsForPicker = useCallback(async () => {
    try {
      const data = await getMenuItems();
      setMenuItems(Array.isArray(data) ? data : data?.menuItems || []);
    } catch {
      setMenuItems([]);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchMenuItemsForPicker();
  }, [fetchOrders, fetchMenuItemsForPicker]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesSearch =
        !term ||
        o.customerName?.toLowerCase().includes(term) ||
        o.customerPhone?.toLowerCase().includes(term);

      const matchesDate =
        !dateFilter ||
        (o.deliveryDate && o.deliveryDate.slice(0, 10) === dateFilter);

      return matchesSearch && matchesDate;
    });
  }, [orders, searchTerm, dateFilter]);

  // Combined "kya banana hai" count across all currently-shown orders
 const kitchenSummary = useMemo(() => {
  const totals = {};
  filteredOrders.forEach((order) => {
    (order.items || []).forEach((item) => {
      const hasCustomSelections =
        item.selectedCustomizations && item.selectedCustomizations.length > 0;

      if (hasCustomSelections) {
        // Customized item → sirf andar ke selected options count honge,
        // parent item (jaise "Brownie") count nahi hoga
        item.selectedCustomizations.forEach((c) => {
          (c.selectedOptions || []).forEach((option) => {
            totals[option] = (totals[option] || 0) + Number(item.quantity || 1);
          });
        });
      } else {
        // Customization nahi hai → item ka apna naam hi count hoga
        totals[item.name] = (totals[item.name] || 0) + Number(item.quantity || 1);
      }
    });
  });
  return Object.entries(totals).sort((a, b) => b[1] - a[1]);
}, [filteredOrders]);
  const isFiltered = Boolean(searchTerm.trim() || dateFilter);

  const openAddModal = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleSaveOrder = async (payload, id) => {
    if (id) {
      await updateOrder(id, payload);
      showToast("success", "Order updated");
    } else {
      await createOrder(payload);
      showToast("success", "Order added");
    }
    await fetchOrders();
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      await updateOrderStatus(order._id, { orderStatus: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? { ...o, orderStatus: newStatus } : o))
      );
    } catch (err) {
      showToast("error", "Status update failed");
    }
  };

  const confirmDelete = (order) => setOrderPendingDelete(order);
  const cancelDelete = () => setOrderPendingDelete(null);

  const handleDelete = async () => {
    if (!orderPendingDelete) return;
    setIsDeleting(true);
    try {
      await deleteOrder(orderPendingDelete._id);
      showToast("success", "Order deleted");
      setOrderPendingDelete(null);
      await fetchOrders();
    } catch (err) {
      showToast("error", "Order not deleted");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-semibold text-stone-800">Orders</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search phone or name"
                className="pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-800 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
              />
            </div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="text-xs font-medium text-stone-500 hover:text-stone-700 whitespace-nowrap"
              >
                Clear date
              </button>
            )}
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
            >
              <Plus size={16} />
              Add Order
            </button>
          </div>
        </div>

        {!isLoading && !loadError && kitchenSummary.length > 0 && (
          <KitchenSummaryCard summary={kitchenSummary} dateFilter={dateFilter} />
        )}

        {isLoading ? (
          <LoadingState />
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={fetchOrders} />
        ) : filteredOrders.length === 0 ? (
          <EmptyState hasSearch={isFiltered} onAdd={openAddModal} />
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onEdit={() => openEditModal(order)}
                onDelete={() => confirmDelete(order)}
                onStatusChange={(status) => handleStatusChange(order, status)}
              />
            ))}
          </div>
        )}

        {!isLoading && !loadError && orders.length > 0 && (
          <OrdersCountFooter
            totalCount={orders.length}
            filteredCount={filteredOrders.length}
            isFiltered={isFiltered}
          />
        )}
      </div>

      <AddOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveOrder}
        initialData={editingOrder}
        menuItems={menuItems}
      />

      {orderPendingDelete && (
        <DeleteConfirmModal
          order={orderPendingDelete}
          isDeleting={isDeleting}
          onCancel={cancelDelete}
          onConfirm={handleDelete}
        />
      )}

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

function KitchenSummaryCard({ summary, dateFilter }) {
  const dateLabel = dateFilter
    ? new Date(dateFilter).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <ChefHat size={16} className="text-emerald-700" />
        <h2 className="text-sm font-semibold text-stone-700">
          Kitchen Summary - what to prepare{dateLabel ? ` (${dateLabel})` : ""}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {summary.map(([name, qty]) => (
          <span
            key={name}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-800"
          >
            {name} × {qty}
          </span>
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order, onEdit, onDelete, onStatusChange }) {
  const itemCount = (order.items || []).reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );
  const dateStr = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-stone-800">
              {order.customerName}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                PAYMENT_STYLES[order.paymentStatus] || "bg-stone-100 text-stone-500"
              }`}
            >
              {order.paymentStatus} · {order.paymentMode}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-stone-500">
            <span className="inline-flex items-center gap-1.5">
              <Phone size={13} /> {order.customerPhone}
            </span>
            {order.deliveryAddress && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} /> {order.deliveryAddress}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} /> {dateStr}
            </span>
            {order.deliveryTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} /> {order.deliveryTime}
              </span>
            )}
          </div>

          <p className="text-sm text-stone-600 mt-2">
            {itemCount} item(s) ·{" "}
            <span className="font-semibold text-stone-800">₹{order.totalAmount}</span>
          </p>

          {order.items?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {order.items.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700"
                >
                  {item.name} × {item.quantity}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={order.orderStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`px-2.5 py-1.5 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 ${
              STATUS_STYLES[order.orderStatus] || "bg-stone-100 text-stone-500"
            }`}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={onEdit}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-emerald-700 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersCountFooter({ totalCount, filteredCount, isFiltered }) {
  return (
    <div className="mt-4 text-center text-sm text-stone-500">
      {isFiltered ? (
        <span>
          Showing <span className="font-semibold text-stone-700">{filteredCount}</span> of{" "}
          <span className="font-semibold text-stone-700">{totalCount}</span> orders
        </span>
      ) : (
        <span>
          Total <span className="font-semibold text-stone-700">{totalCount}</span>{" "}
          {totalCount === 1 ? "order" : "orders"}
        </span>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-stone-500">
      <Loader2 size={28} className="animate-spin mb-3 text-emerald-700" />
      <p className="text-sm">Orders loading</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-2xl border border-stone-200">
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
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-2xl border border-stone-200">
      {hasSearch ? (
        <>
          <p className="text-sm font-medium text-stone-700">No orders found</p>
          <p className="text-sm text-stone-500 mt-1">Try a different search or date filter.</p>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-stone-700">No orders yet</p>
          <p className="text-sm text-stone-500 mt-1 mb-4">
            Add your first order manually.
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            <Plus size={16} />
            Add Order
          </button>
        </>
      )}
    </div>
  );
}

function DeleteConfirmModal({ order, isDeleting, onCancel, onConfirm }) {
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

        <h3 className="text-base font-semibold text-stone-800">Delete this order?</h3>
        <p className="text-sm text-stone-500 mt-1.5">
          <span className="font-medium text-stone-700">
            "{order.customerName}"
          </span>{" "}
         will be
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