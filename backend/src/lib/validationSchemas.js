import { z } from 'zod';

// Schema for user registration
export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be no more than 20 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

// Schema for user login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

// Schema for creating a new post
export const postSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title should be more descriptive").max(100, "Title must be no more than 100 characters long"),
    content: z.string().min(30, " More Content is required").max(5000, "Content must be no more than 5000 characters long"),
  })
})