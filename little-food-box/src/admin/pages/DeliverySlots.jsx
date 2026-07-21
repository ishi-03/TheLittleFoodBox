import { useEffect, useState } from "react";

import DeliverySlotModal from "../components/DeliverySlotModal.jsx";

import {
  getSlots,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../services/deliverySlotApi";
import { formatTime } from "../../utils/time.js";
export default function DeliverySlots() {
  const [slots, setSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

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

  useEffect(() => {
    loadSlots();
  }, []);

  const saveSlot = async (form) => {
    let data;

    if (editingSlot) {
      data = await updateSlot(editingSlot._id, form);
    } else {
      data = await createSlot(form);
    }

    if (data.success) {
      alert(
        editingSlot
          ? "Slot Updated"
          : "Slot Created"
      );

      setOpen(false);
      setEditingSlot(null);

      loadSlots();
    } else {
      alert(data.message);
    }
  };

  const editSlot = (slot) => {
    setEditingSlot(slot);
    setOpen(true);
  };

  const removeSlot = async (id) => {
    const ok = window.confirm(
      "Delete this delivery slot?"
    );

    if (!ok) return;

    const data = await deleteSlot(id);

    if (data.success) {
      alert("Deleted Successfully");
      loadSlots();
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <h1
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Delivery Slots
        </h1>

        <button
          onClick={() => {
            setEditingSlot(null);
            setOpen(true);
          }}
          style={{
            background: "#166534",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          + Add Slot
        </button>
      </div>

      <table
        width="100%"
        border="1"
        cellPadding="12"
        style={{
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            background: "#f3f4f6",
          }}
        >
          <tr>
            <th>Shift</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Sort Order</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                align="center"
              >
                No Delivery Slots Found
              </td>
            </tr>
          ) : (
            slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.shift}</td>

                <td>{formatTime(slot.startTime)}</td>

                <td>{formatTime(slot.endTime)}</td>

                <td>
                  {slot.active
                    ? "Active"
                    : "Inactive"}
                </td>

                <td>{slot.sortOrder}</td>

                <td>
                  <button
                    onClick={() =>
                      editSlot(slot)
                    }
                    style={{
                      marginRight: 10,
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeSlot(slot._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <DeliverySlotModal
        open={open}
        editingSlot={editingSlot}
        onClose={() => {
          setOpen(false);
          setEditingSlot(null);
        }}
        onSave={saveSlot}
      />
    </div>
  );
}