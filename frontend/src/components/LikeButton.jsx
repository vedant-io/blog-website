import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// A reusable, animated button for liking posts.
const LikeButton = ({ initialLikes, isLiked: initialIsLiked }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    // Here you would call your API mutation to like/unlike the post
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleLike}
        >
          <Heart
            className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
      </motion.div>
      <span className="text-lg font-medium text-muted-foreground">{likes}</span>
    </div>
  );
};

export default LikeButton;
