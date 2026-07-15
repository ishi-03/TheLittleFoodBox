const API = `${import.meta.env.VITE_API_URL}/api/subscription-plans`;

export const getPlans = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const createPlan = async (plan) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plan),
  });

  return await res.json();
};

export const updatePlan = async (id, plan) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plan),
  });

  return await res.json();
};

export const deletePlan = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};