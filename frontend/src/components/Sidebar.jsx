import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// This is the redesigned Sidebar component with more features.
const Sidebar = () => {
  // Placeholder data
  const featuredPosts = [
    { id: 1, title: "The Art of Minimalist Design" },
    { id: 5, title: "A Guide to Modern CSS" },
    { id: 6, title: "Why Every Developer Needs a Blog" },
  ];

  const popularTags = [
    "React",
    "JavaScript",
    "Design",
    "Node.js",
    "CSS",
    "Tutorial",
  ];

  return (
    <motion.aside
      className="sticky top-24 space-y-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {/* Featured Posts Section */}
      <div className="p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Featured Posts</h3>
        <ul className="space-y-4">
          {featuredPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`} className="group flex items-start">
                <ArrowUpRight className="h-4 w-4 text-muted-foreground mr-3 mt-1 flex-shrink-0" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags Section */}
      <div className="p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Button key={tag} variant="secondary" size="sm" asChild>
              <Link to={`/tag/${tag.toLowerCase()}`}>{tag}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest posts delivered right to your inbox.
        </p>
        <form className="flex space-x-2">
          <Input type="email" placeholder="Email" className="flex-1" />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
