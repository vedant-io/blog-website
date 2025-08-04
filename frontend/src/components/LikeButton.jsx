import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../api/post"; // 1. Import your new API function

// The component now accepts the postId to know which post to update
const LikeButton = ({ initialLikes, isLiked: initialIsLiked, postId }) => {
  const queryClient = useQueryClient();

  // We still use local state for an instant UI update (optimistic update)
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  // FIX: The useEffect has been removed.
  // The component now initializes its state from props once and then manages it internally.
  // This prevents the state from being reset on parent re-renders, which fixes the flicker.

  // 2. Set up the mutation to call our API
  const mutation = useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => {
      // 3. When the API call is successful, refetch the post and user data
      // This ensures the UI is in sync with the database
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      // If the API call fails, revert the optimistic update
      console.error("Failed to like post:", error);
      setIsLiked(initialIsLiked);
      setLikes(initialLikes);
    },
  });

  const handleLike = () => {
    // 4. Optimistically update the UI for a fast user experience
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    // 5. Trigger the API call
    mutation.mutate();
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleLike}
          disabled={mutation.isPending} // Disable the button while the request is in flight
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </motion.div>
      <span className="text-lg font-medium text-muted-foreground">{likes}</span>
    </div>
  );
};

export default LikeButton;
