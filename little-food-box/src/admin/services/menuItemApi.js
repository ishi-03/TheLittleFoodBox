import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/menu-items`;

// Get all menu items
export const getMenuItems = async () => {
  const { data } = await axios.get(API);
  return data;
};

// Create menu item
export const createMenuItem = async (menuItem) => {
  const headers = {};

  if (menuItem instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const { data } = await axios.post(API, menuItem, {
    headers,
  });

  return data;
};
// Update menu item
export const updateMenuItem = async (id, menuItem) => {
  const headers = {};

  if (menuItem instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const { data } = await axios.put(`${API}/${id}`, menuItem, {
    headers,
  });

  return data;
};

// Delete menu item
export const deleteMenuItem = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`);
  return data;
};

 