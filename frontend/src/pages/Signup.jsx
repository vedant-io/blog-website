import React from "react";
// 1. IMPORT the SignUpForm component you created
import { SignUpForm } from "@/components/SignUpForm"; // Adjust this path if needed

const Signup = () => {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Left Side: Branding */}
      <div className="hidden bg-zinc-100 lg:flex lg:flex-col lg:items-center lg:justify-center p-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Your Blog Awaits
        </h1>
        <p className="mt-4 text-zinc-600">
          Join a community of writers and thinkers. <br /> Share your story with
          the world.
        </p>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center py-12">
        {/* 2. Now React knows what to render here */}
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
