import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react"; // For a loading spinner
import { getAllPostsQueryOption } from "../queryOptions/postsQueryOption";

const HomePage = () => {
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery(getAllPostsQueryOption());

  console.log("Posts data:", posts);

  const createSnippet = (content, length = 100) => {
    if (!content) return "";
    if (content.length <= length) {
      return content;
    }
    return content.slice(0, length) + "...";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  if (isPending) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (isError) {
    console.log("Error fetching posts:", isError);
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <p className="text-red-500">
            Failed to load posts. Please try again later.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* FIX: Corrected the typo from sm-px-6 to sm:px-6 */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={{
                    id: post._id,
                    title: post.title,
                    snippet: createSnippet(post.content),
                    author: post.author?.username || "Anonymous",
                    date: formatDate(post.createdAt),
                  }}
                  variants={itemVariants}
                />
              ))
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <h3 className="text-xl font-semibold">
                  No posts have been written yet.
                </h3>
                <p className="text-muted-foreground mt-2">
                  Why not be the first?{" "}
                  <Link to="/create-post" className="text-primary underline">
                    Write a new post
                  </Link>
                  .
                </p>
              </div>
            )}
          </motion.div>

          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
