import { axiosInstance } from "./axios";

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts/all");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};
