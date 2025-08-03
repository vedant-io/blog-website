import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// A reusable component to display author information.
const AuthorBio = ({ author }) => {
  return (
    <div className="mt-12 p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg flex items-center space-x-4">
      <Avatar className="h-16 w-16">
        {/* The avatar is generated based on the username, which is available */}
        <AvatarImage
          src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${author.username}`}
          alt={author.username}
        />
        <AvatarFallback>{author.username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">Written by</p>
        <h3 className="text-xl font-semibold">{author.username}</h3>
        {/* The bio has been removed to match the backend model */}
        <p className="text-muted-foreground mt-1">
          A passionate writer sharing thoughts and ideas with the world.
        </p>
      </div>
    </div>
  );
};

export default AuthorBio;
