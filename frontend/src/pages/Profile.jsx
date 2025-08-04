import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Separator } from "@/components/ui/separator";
import { Mail, CalendarDays, Loader2 } from "lucide-react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getMe } from "../api/auth";
import { getPostById } from "../api/post";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // 1. Fetch the current logged-in user's data
  const {
    data: currentUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    retry: false, // Don't retry if the user is not logged in
  });

  // 2. Get the array of post IDs from the user data
  const postIds = currentUser?.posts || [];

  // 3. Fetch the full details for each post ID in parallel
  const postQueries = useQueries({
    queries: postIds.map((postId) => {
      return {
        queryKey: ["post", postId],
        queryFn: () => getPostById(postId),
      };
    }),
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const createSnippet = (content, length = 150) => {
    if (!content) return "";
    if (content.length <= length) {
      return content;
    }
    return content.slice(0, length) + "...";
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

  // Handle loading state
  if (isUserLoading) {
    return (
      <>
        <Navbar isAuthenticated={false} />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }

  // Handle error state (e.g., user is not logged in)
  if (isUserError || !currentUser) {
    return (
      <>
        <Navbar isAuthenticated={false} />
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">
            Please log in to view your profile.
          </h3>
          <Link
            to="/login"
            className="text-primary underline mt-2 inline-block"
          >
            Go to Login
          </Link>
        </div>
      </>
    );
  }

  // Filter out posts that are still loading or have errors
  const userPosts = postQueries
    .filter((query) => query.isSuccess && query.data)
    .map((query) => query.data);

  return (
    <>
      <Navbar isAuthenticated={true} />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: User Profile Information */}
          <motion.aside
            className="lg:sticky lg:top-24 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground mb-4">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold">{currentUser.username}</h2>
                <Separator className="my-6" />
                <div className="space-y-4 text-left w-full">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>Joined on {formatDate(currentUser.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Right Column: User's Post Feed */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground border-b pb-4">
              My Posts
            </h1>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={{
                    id: post._id,
                    title: post.title,
                    snippet: createSnippet(post.content),
                    author: post.author.username,
                    date: formatDate(post.createdAt),
                  }}
                  variants={itemVariants}
                />
              ))
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <h3 className="text-xl font-semibold">No posts yet</h3>
                <p className="text-muted-foreground mt-2">
                  When you write a post, it will appear here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
