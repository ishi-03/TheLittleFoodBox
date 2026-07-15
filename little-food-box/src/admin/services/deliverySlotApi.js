const API = `${import.meta.env.VITE_API_URL}/api/delivery-slots`;

export const getSlots = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const createSlot = async (slot) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(slot),
  });

  return await res.json();
};

export const updateSlot = async (id, slot) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(slot),
  });

  return await res.json();
};

export const deleteSlot = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};