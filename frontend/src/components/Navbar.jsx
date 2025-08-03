import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookUser, Plus, User } from "lucide-react";

const Navbar = () => {
  // This will be your authentication status. For now, we'll assume the user is logged in.
  const isAuthenticated = true;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Aligned Section (can be empty or have other links) */}
        <div className="flex-1"></div>

        {/* Center Aligned Section (Logo/Title) */}
        <div className="flex flex-1 justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookUser className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl tracking-tight">The Blog</span>
          </Link>
        </div>

        {/* Right Aligned Section (Actions) */}
        <div className="flex flex-1 justify-end items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/post">
                <Button variant="ghost" className="hidden sm:flex">
                  <Plus className="mr-2 h-4 w-4" />
                  Write
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
