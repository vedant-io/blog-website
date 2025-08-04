import { axiosInstance } from "./axios";

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts/all");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axiosInstance.post("/posts/create", postData);
  return response.data;
};

export const likePost = async (postId) => {
  const { data } = await axiosInstance.post(`/posts/${postId}/like`);
  return data;
};

export const getFeaturedPosts = async () => {
  const { data } = await axiosInstance.get(`/posts/featured`);
  return data;
};

export const getPopularTags = async () => {
  const { data } = await axiosInstance.get(`/posts/tags/popular`);
  return data;
};

export const getPostsByTag = async (tag) => {
  const { data } = await axiosInstance.get(`/posts/tag/${tag}`);
  return data;
};
