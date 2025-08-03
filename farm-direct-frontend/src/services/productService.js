import axios from "axios";

const API_URL = "http://localhost:5001/api/products";

const fetchProducts = async (filters = {}) => {
  const { category, search, minPrice, maxPrice } = filters;
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const response = await axios.get(`${API_URL}?${params.toString()}`);
  return response.data;
};

const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createProduct = async (productData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("category", productData.category);
  formData.append("quantity", productData.quantity);
  formData.append("expiryDate", productData.expiryDate);
  formData.append("image", productData.image);

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  if (productData.name) formData.append("name", productData.name);
  if (productData.description)
    formData.append("description", productData.description);
  if (productData.price) formData.append("price", productData.price);
  if (productData.category) formData.append("category", productData.category);
  if (productData.quantity) formData.append("quantity", productData.quantity);
  if (productData.expiryDate)
    formData.append("expiryDate", productData.expiryDate);
  if (productData.image) formData.append("image", productData.image);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const fetchFarmerProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/farmer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchFarmerProducts,
};
