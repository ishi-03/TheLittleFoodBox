import axios from "axios";

const API = import.meta.env.VITE_API_URL;

console.log("VITE_API_URL =", API);

export const createOrder = async (amount) => {
  console.log("Calling:", `${API}/api/payment/create-order`);

  const res = await axios.post(`${API}/api/payment/create-order`, {
    amount,
  });

  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axios.post(`${API}/api/payment/verify`, data);

  return res.data;
};