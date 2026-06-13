import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, BookUser, User, Loader2 } from "lucide-react";
import GoogleIconUrl from "../assets/google-icon-logo.svg";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/auth"; // 1. Import getMe API function

const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("Signup successful!", data);
      navigate("/");
    },
    onError: (error) => {
      setError("root", {
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      });
      console.error("Sign up error:", error);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://blog-api.vedantd.in/api/auth/google";
    navigate("/profile");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto border-0 bg-background md:border md:shadow-lg md:p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="text-center p-6">
            <div className="mb-4 flex justify-center">
              <BookUser className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Create Your Account
            </CardTitle>
            <CardDescription className="pt-2">
              Join our community. It's quick and easy.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 p-6 pt-0">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center h-11"
              type="button"
              onClick={handleGoogleLogin}
            >
              <img
                src={GoogleIconUrl}
                alt="Google icon"
                className="mr-2 h-5 w-5"
              />
              Sign up with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  Or sign up with email
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="your_username"
                    className="pl-9 h-11"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm px-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="pl-9 h-11"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm px-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-10 h-11"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 h-8 w-8"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm px-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {errors.root && (
              <p className="text-red-500 text-sm text-center -mt-2">
                {errors.root.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-4 p-6 pt-0">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 text-base hover:bg-primary/90"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline font-semibold text-primary hover:text-primary/80"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};
