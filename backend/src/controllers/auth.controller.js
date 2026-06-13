import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    res.status(400);
    throw new Error(
      existingUser.email === email
        ? "Email already exists"
        : "Username already exists"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    const token = generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message: "User created successfully",
      token: token,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create user");
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: token,
    message: "Login successful",
  });
};

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const me = (req, res) => {
  res.status(200).json(req.user);
};

export const googleLogin = (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("No user found");
  }
  generateToken(req.user._id, res);
  res.redirect(`${config.frontend}/profile`);
  res.status(200).json({
    message: "Google login successful",
  });
};
