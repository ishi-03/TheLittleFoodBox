const API = `${import.meta.env.VITE_API_URL}/api/salads`;

export const getSalads = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const createSalad = async (salad) => {
  const token = localStorage.getItem("token");

  const fd = new FormData();

  Object.keys(salad).forEach((key) => {
    if (key === "ingredients" || key === "dressings" || key === "variants") {
      fd.append(key, JSON.stringify(salad[key]));
    } else {
      fd.append(key, salad[key]);
    }
  });

  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });

  return await res.json();
};

export const updateSalad = async (id, salad) => {
  const token = localStorage.getItem("token");

  const fd = new FormData();

  Object.keys(salad).forEach((key) => {
    if (key === "ingredients" || key === "dressings" || key === "variants") {
      fd.append(key, JSON.stringify(salad[key]));
    } else {
      fd.append(key, salad[key]);
    }
  });

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
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