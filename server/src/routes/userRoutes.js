import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/AuthMiddleware.js";

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Get user profile
router.get("/me", protect, getUserProfile);

export default router;
