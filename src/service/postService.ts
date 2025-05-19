import axios from "axios";

const API_URL = "https://final-api-ej8d.onrender.com/dedote/posts";

export interface Post {
  id?: number;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const res = await axios.post(API_URL, post);
  return res.data;
};

export const updatePost = async (id: number, post: Post): Promise<Post> => {
  const res = await axios.put(`${API_URL}/${id}`, post);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};