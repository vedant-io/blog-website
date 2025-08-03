import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import AuthorBio from "@/components/AuthorBio";
import { Link as LinkIcon, Check, Loader2 } from "lucide-react";
import { getPostById } from "../api/post";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams(); // Get the post ID from the URL

  // FIX: Uncommented and correctly configured useQuery
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    // The queryKey should be unique for each post
    queryKey: ["post", id],
    // Pass the id to your API fetching function
    queryFn: () => getPostById(id),
    // This prevents the query from running if there's no id
    enabled: !!id,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </>
    );
  }

  // Handle error state
  if (isError || !post) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <p className="text-red-500">
            Could not find post. It may have been removed.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <article>
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <span>By {post.author?.username || "Anonymous"}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <div className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <LikeButton
                initialLikes={post.likes?.length || 0}
                isLiked={post.isLiked}
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Share:
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleCopyLink}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <LinkIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </footer>

          {post.author && <AuthorBio author={post.author} />}
        </article>
      </motion.main>
    </>
  );
};

export default PostPage;
