import { queryOptions } from "@tanstack/react-query";
import { getAllPosts } from "../api/post";

export const getAllPostsQueryOption = () => {
  return queryOptions({
    queryKey: ["allposts"],
    queryFn: getAllPosts,
    staleTime: 10000,
  });
};
