import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { motion } from "framer-motion";

// A reusable component to encourage guests to log in.
const LoginPrompt = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg text-center sticky top-24"
    >
      <PenSquare className="h-10 w-10 text-primary mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Have a story to share?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Log in to create and publish your own posts for the community to read.
      </p>
      <Button asChild className="w-full">
        <Link to="/login">Log In or Sign Up</Link>
      </Button>
    </motion.div>
  );
};

export default LoginPrompt;
