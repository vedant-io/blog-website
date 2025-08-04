import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import TagInput from "@/components/TagInput";
import { Send, Lightbulb, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";

// Zod schema for form validation
const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  content: z.string().min(20, "Content must be at least 20 characters long."),
});

const CreatePostPage = () => {
  const [tags, setTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Post created successfully!", data);
      setIsSaving(false);
      // Optionally redirect or show a success message
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      setIsSaving(false);
      // Optionally show an error message
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const titleValue = watch("title");
  const contentValue = watch("content");

  // Simulate autosaving
  useEffect(() => {
    if (isDirty) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        setIsSaving(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [titleValue, contentValue, isDirty]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    mutate({ ...data, tags });

    // Reset form or redirect after successful submission
    setTags([]);
    setIsSaving(false);
    console.log("Form submitted:", data);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content: Writing Area */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-6 space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Your brilliant post title..."
                      className="text-2xl font-bold h-14"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content" className="text-lg font-semibold">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Tell your story..."
                      className="min-h-[500px] text-base"
                      {...register("content")}
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm">
                        {errors.content.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Publishing Tools */}
            <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
              <div className="p-6 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Publishing</h3>
                  <div className="text-sm text-muted-foreground flex items-center">
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    <span>{isSaving ? "Saving..." : "Saved"}</span>
                  </div>
                </div>
                <Separator className="mb-6" />
                <div className="space-y-6">
                  <div>
                    <Label className="font-medium">Tags</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add tags to help readers find your post.
                    </p>
                    <TagInput tags={tags} setTags={setTags} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 text-base"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {isPending ? "Publishing..." : "Publish Post"}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default CreatePostPage;
