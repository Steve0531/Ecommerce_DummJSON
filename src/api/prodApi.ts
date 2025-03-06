import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export const fetchProducts = async (searchTerm = "", category = "") => {
  let endpoint = "/products";

  if (category) {
    endpoint = `/products/category/${category}`;
  } else if (searchTerm) {
    endpoint = `/products/search?q=${searchTerm}`;
  }

  const response = await api.get(endpoint);
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (productData: object) => {
  const response = await api.post("/products/add", productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: object) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get("/products/category-list");
  return response.data;
};