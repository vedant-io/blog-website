import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const createPost = async (req, res, next) => {
  const { title, content, tags = [] } = req.body;
  const authorId = req.user._id;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const newPost = new Post({
    title,
    content,
    author: authorId,
    tags,
  });

  if (newPost) {
    await newPost.save();
    const user = await User.findById(authorId);
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json(newPost);
  } else {
    res.status(500);
    throw new Error("Failed to create post");
  }
};

export const getAllPosts = async (req, res, next) => {
  const posts = await Post.find().populate("author", "username email");
  res.status(200).json(posts);
};

export const getPostById = async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username email"
  );
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.status(200).json(post);
};

export const likePost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const update = post.likes.includes(userId)
    ? { $pull: { likes: userId } }
    : { $push: { likes: userId } };

  const updatedPost = await Post.findByIdAndUpdate(postId, update, {
    new: true,
  });

  res
    .status(200)
    .json({ message: "Post updated successfully", post: updatedPost });
};

export const getFeaturedPosts = async (req, res, next) => {
  const featuredPosts = await Post.find({}).sort({ createdAt: -1 }).limit(3);
  res.status(200).json(featuredPosts);
};

export const getPopularTags = async (req, res, next) => {
  try {
    const popularTags = await Post.aggregate([
      // Stage 1: Deconstruct the tags array
      { $unwind: "$tags" },

      // FIX: Add this new stage to normalize the tags
      // Stage 2: Project a new field with the lowercase version of the tag
      { $project: { tag: { $toLower: "$tags" } } },

      // Stage 3: Group by the new lowercase 'tag' field and count
      { $group: { _id: "$tag", count: { $sum: 1 } } },

      // Stage 4: Sort by count in descending order
      { $sort: { count: -1 } },

      // Stage 5: Limit the results
      { $limit: 10 },

      // Stage 6: Clean up the output fields
      { $project: { _id: 0, tag: "$_id", count: 1 } },
    ]);
    res.status(200).json(popularTags);
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    res.status(500);
    throw new Error("Failed to fetch popular tags");
  }
};

export const getPostsByTag = async (req, res, next) => {
  try {
    const tagName = req.params.tagName;
    const posts = await Post.find({ tags: tagName }).populate(
      "author",
      "username email"
    );
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    res.status(500);
    throw new Error("Failed to fetch posts by tag");
  }
};
