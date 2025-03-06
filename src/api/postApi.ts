import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export const fetchPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
  };
  
export const fetchPostById = async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};
  
export const fetchComments = async (id:number) => {
    const response = await api.get(`posts/${id}/comments`);
    return response.data;
};
  
export const addComment = async (commentData: object) => {
    const response = await api.post("/comments/add", commentData);
    return response.data;
};