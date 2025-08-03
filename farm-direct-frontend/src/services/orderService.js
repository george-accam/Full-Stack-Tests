import axios from "axios";

const API_URL = "http://localhost:5001/api/orders";

const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const fetchOrderById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const fetchCustomerOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/myorders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const fetchFarmerOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/farmer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateOrderStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}/${status}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export {
  createOrder,
  fetchOrderById,
  fetchCustomerOrders,
  fetchFarmerOrders,
  updateOrderStatus,
};
