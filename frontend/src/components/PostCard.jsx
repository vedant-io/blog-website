import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// This is the redesigned PostCard with a more professional and clean look.
const PostCard = ({ post, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="group"
      whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.04)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/post/${post.id}`} className="block">
        <div className="bg-background p-6 rounded-lg border h-full">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                <span className="font-semibold">{post.author}</span>
                <span className="mx-2">&middot;</span>
                <span>{post.date}</span>
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {post.snippet}
              </p>
            </div>
            <div className="mt-4 flex items-center text-sm font-semibold text-primary/80">
              Read More
              <ArrowUpRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
