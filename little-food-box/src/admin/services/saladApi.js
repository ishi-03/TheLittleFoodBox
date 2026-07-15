const API = `${import.meta.env.VITE_API_URL}/api/salads`;

export const getSalads = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const createSalad = async (salad) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(salad),
  });

  return await res.json();
};

export const updateSalad = async (id, salad) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(salad),
  });

  return await res.json();
};

export const deleteSalad = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};