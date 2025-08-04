import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookUser, Plus, User, LogOut, Loader2 } from "lucide-react";
import { logoutUser } from "../api/auth"; // We still need the API function

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Simplified logout handler without useMutation
  const handleLogout = async () => {
    setIsLoggingOut(true); // Set loading state to true
    try {
      await logoutUser();
      // Manually redirect to the login page
      navigate("/login");
      // A full page reload can help ensure all cached data is cleared
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show a toast message)
    } finally {
      setIsLoggingOut(false); // Set loading state to false
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-1"></div>

        <div className="flex flex-1 justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookUser className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl tracking-tight">The Blog</span>
          </Link>
        </div>

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
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoggingOut} // Disable button while logging out
                className="rounded-full"
                title="Logout"
              >
                {/* Show a loader while logging out */}
                {isLoggingOut ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
                <span className="sr-only">Logout</span>
              </Button>
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
