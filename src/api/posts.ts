import axios from "axios";

const API_URL = "http://localhost:8080/dedote/posts";

export interface Post {
  id?: number;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getPosts = () => axios.get<Post[]>(API_URL);
export const getPost = (id: number) => axios.get<Post>(`${API_URL}/${id}`);
export const createPost = (data: Omit<Post, "id" | "createdAt" | "updatedAt">) =>
  axios.post<Post>(API_URL, data);
export const updatePost = (id: number, data: Partial<Post>) =>
  axios.put<Post>(`${API_URL}/${id}`, data);
export const deletePost = (id: number) => axios.delete(`${API_URL}/${id}`);