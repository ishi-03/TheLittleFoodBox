import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/orders`;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all orders — params: { status, date }
export const getOrders = async (params = {}) => {
  const { data } = await axios.get(API, {
    params,
    headers: authHeaders(),
  });
  return data;
};

// Get single order
export const getOrder = async (id) => {
  const { data } = await axios.get(`${API}/${id}`, {
    headers: authHeaders(),
  });
  return data;
};

// Create order
export const createOrder = async (order) => {
  const { data } = await axios.post(API, order, {
    headers: authHeaders(),
  });
  return data;
};

// Update order (full edit)
export const updateOrder = async (id, order) => {
  const { data } = await axios.put(`${API}/${id}`, order, {
    headers: authHeaders(),
  });
  return data;
};

// Quick status / payment status update
export const updateOrderStatus = async (id, statusUpdate) => {
  const { data } = await axios.patch(`${API}/${id}/status`, statusUpdate, {
    headers: authHeaders(),
  });
  return data;
};

// Delete order
export const deleteOrder = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, {
    headers: authHeaders(),
  });
  return data;
};