import express from "express";
import {
  createPost,
  getAllPosts,
  getFeaturedPosts,
  getPopularTags,
  getPostById,
  getPostsByTag,
  likePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import validate from "../middleware/validate.js";
import { postSchema } from "../lib/validationSchemas.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/featured", getFeaturedPosts);
router.get("/tags/popular", getPopularTags);

router.get("/tag/:tagName", getPostsByTag);
router.get("/:id", getPostById);

router.post("/create", protectRoute, validate(postSchema), createPost);
router.post("/:id/like", protectRoute, likePost);

export default router;
