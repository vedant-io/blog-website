import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LoginPrompt from "@/components/LoginPrompt";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getAllPosts } from "../api/post";
import { getMe } from "../api/auth";

const HomePage = () => {
  // Fetch all posts
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError,
  } = useQuery({
    queryKey: ["allposts"],
    queryFn: getAllPosts,
  });

  // Fetch current user status to determine what to show
  const { data: currentUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    retry: false, // Don't retry if the user is a guest
  });

  // FIX: The problematic useEffect that caused an infinite loop has been removed.

  const createSnippet = (content, length = 150) => {
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

  // Show a loader while fetching posts or checking auth status
  if (isPostsLoading || isAuthLoading) {
    return (
      <>
        <Navbar isAuthenticated={!!currentUser} />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar isAuthenticated={!!currentUser} />
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
      <Navbar isAuthenticated={!!currentUser} />
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
              </div>
            )}
          </motion.div>

          <div className="hidden lg:block">
            {/* Conditionally render the Sidebar for logged-in users, or the LoginPrompt for guests */}
            {currentUser ? <Sidebar /> : <LoginPrompt />}
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
