import React from "react";
import LoginForm from "@/components/LoginForm"; // Make sure the path is correct

const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Left Side: Branding and Welcome Message */}
      <div className="hidden bg-zinc-100 lg:flex lg:flex-col lg:items-center lg:justify-center p-8 text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Welcome Back to Your Blog
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Continue your journey and share your next great story with the
            world.
          </p>
        </div>
      </div>

      {/* Right Side: The Login Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
