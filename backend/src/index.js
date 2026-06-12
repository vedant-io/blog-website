import config from "./config.js";
import express from "express";
import cors from "cors";

import { connectToDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./strategies/google-strategy.js";

import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    // Replace this with the actual URL of your frontend
    origin: "http://localhost:8080",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

app.listen(3001, async () => {
  await connectToDB();
  console.log("Server is running on http://localhost:3001");
});
