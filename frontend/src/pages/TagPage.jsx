import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Tag } from "lucide-react";

const TagPage = () => {
  // 1. Get the tag name from the URL using useParams
  const { tagName } = useParams();

  // Placeholder data - in a real app, you would fetch posts for the specific tagName
  const allPosts = [
    {
      id: 1,
      title: "The Art of Minimalist Design",
      snippet: "A look into clean and intuitive user experiences.",
      author: { username: "Jane Doe" },
      createdAt: "2025-08-03T12:00:00Z",
      tags: ["design", "minimalism"],
    },
    {
      id: 2,
      title: "A Deep Dive into React Hooks",
      snippet: "Unlock the full potential of functional components.",
      author: { username: "John Smith" },
      createdAt: "2025-07-28T12:00:00Z",
      tags: ["react", "javascript"],
    },
    {
      id: 3,
      title: "State Management with React Query",
      snippet: "Learn the best way to manage server state.",
      author: { username: "Alex Johnson" },
      createdAt: "2025-07-25T12:00:00Z",
      tags: ["react", "data"],
    },
  ];

  // 2. Filter the posts to find ones that include the current tag
  const filteredPosts = allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tagName.toLowerCase())
  );

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

  return (
    <>
      <Navbar />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
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

        {/* Posts List */}
        <motion.div
          className="grid grid-cols-1 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  snippet: post.snippet,
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
      </main>
    </>
  );
};

export default TagPage;
