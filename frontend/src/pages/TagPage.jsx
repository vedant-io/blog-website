import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Tag, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPostsByTag } from "../api/post"; // 1. Import your API function

const TagPage = () => {
  const { tagName } = useParams();

  // 2. Use React Query to fetch posts for the specific tag from your backend
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["postsByTag", tagName], // A unique key for this query
    queryFn: () => getPostsByTag(tagName),
    enabled: !!tagName, // Only run the query if tagName is available
  });

  const formatDate = (dateString) => {
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

  return (
    <>
      <Navbar />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 border-b pb-6">
          <div className="flex items-center">
            <Tag className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Posts tagged with</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground capitalize">
                {tagName}
              </h1>
            </div>
          </div>
        </header>

        {/* 3. Handle loading, error, and empty states */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-16 border rounded-lg">
            <h3 className="text-xl font-semibold text-red-500">
              Could not fetch posts for this tag.
            </h3>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts && posts.length > 0 ? (
              posts.map((post) => (
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
                <h3 className="text-xl font-semibold">
                  No posts found for this tag
                </h3>
                <p className="text-muted-foreground mt-2">
                  Try exploring other topics from the{" "}
                  <Link to="/" className="text-primary underline">
                    homepage
                  </Link>
                  .
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </>
  );
};

export default TagPage;
