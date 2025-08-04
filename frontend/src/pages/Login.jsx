import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

import { Loader2 } from "lucide-react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  // This query checks if a user is already logged in.
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    retry: false, // Don't retry if the user is not logged in (which is expected)
  });

  // This effect runs when the query finishes. If a user is found, it redirects.
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // While checking the auth status, display a full-screen loader.
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If a user is found, render nothing while the useEffect handles the redirect.
  // This prevents the form from flashing on the screen for logged-in users.
  if (currentUser) {
    return null;
  }

  // If loading is finished and there's no user, it's safe to show the form.
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
