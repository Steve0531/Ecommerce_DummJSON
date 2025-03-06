import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchUsers = async (searchTerm="",filterKey="",filterValue="") => {
    let endpoint = "/users";
  
    if (searchTerm) {
      endpoint = `/users/search?q=${searchTerm}`;
    }
    else if(filterKey && filterValue)
      endpoint=`/users/filter?key=${filterKey}&value=${filterValue}`
    const response = await api.get(endpoint);
    return response.data;
};
  
export const fetchUserById = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};
  
export const updateUser = async (id: number, userData: object) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data.users;
};
  
export const fetchFilteredUsers = async (key: string, value: string) => {
    const response = await api.get(`users/filter?key=${key}&value=${value}`);
    return response.data;
}; 
  