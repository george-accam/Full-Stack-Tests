import axios from "axios";

const API_URL = "http://localhost:5001/api";

const register = async (name, email, password, role, address, phone) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    role,
    address,
    phone,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

const getMe = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export { register, login, getMe };
