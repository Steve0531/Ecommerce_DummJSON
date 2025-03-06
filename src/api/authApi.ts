import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  const data = response.data
  const adminUsers = ["emilys"]; // Add specific usernames

  const role = adminUsers.includes(data.username) ? "admin" : "user";
  return { ...data, role };
};








