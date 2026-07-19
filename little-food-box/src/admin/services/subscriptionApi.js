const API = `${import.meta.env.VITE_API_URL}/api/subscriptions`;
export const createSubscription = async (body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};
export const getSubscriptions = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export const getSubscription = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export const updateSubscription = async (id, body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const deleteSubscription = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};