const API = `${import.meta.env.VITE_API_URL}/api/dashboard`;

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};