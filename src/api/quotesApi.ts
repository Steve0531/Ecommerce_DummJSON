import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export const fetchQuotes = async () => {
    const response = await api.get("/quotes");
    return response.data;
};
  
export const fetchRecipes = async () => {
    const response = await api.get("/recipes");
    return response.data;
};