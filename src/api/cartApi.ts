import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export const fetchCarts = async () => {
    const response = await api.get("/carts");
    return response.data.carts; 
};
  
export const fetchCartById = async () => {
    const response = await api.get(`/carts/1`);
    return response.data;
};
  
export const addToCart = async (cartId: number, productId: number, quantity: number) => {
    const response = await api.post(`/carts/add`, {
      userId: cartId,
      products: [{ id: productId, quantity }],
    });
    return response.data;
};
  