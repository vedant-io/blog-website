import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Separator } from "@/components/ui/separator";
import { Mail, CalendarDays } from "lucide-react";

const ProfilePage = () => {
  // Placeholder data - you will replace this with the logged-in user's data
  const user = {
    username: "Jane Doe",
    email: "jane.doe@example.com",
    createdAt: "2025-08-01T10:00:00Z",
  };

  // Placeholder data for the user's posts
  const userPosts = [
    {
      id: 1,
      title: "The Art of Minimalist Design",
      snippet:
        "Discover how less can be more in modern web development, creating clean and intuitive user experiences...",
      author: { username: "Jane Doe" },
      createdAt: "2025-08-03T12:00:00Z",
    },
    {
      id: 7,
      title: "A Personal Journey into Blogging",
      snippet:
        "Exploring the reasons why starting a personal blog can be a rewarding experience for any developer...",
      author: { username: "Jane Doe" },
      createdAt: "2025-06-15T12:00:00Z",
    },
  ];

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
                  {user.username.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <Separator className="my-6" />
                <div className="space-y-4 text-left w-full">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>Joined on {formatDate(user.createdAt)}</span>
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
