import express from "express";
const router = express.Router();
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/AuthMiddleware.js";

// Create a new transaction
router.post("/", protect, createTransaction);

// Get all transactions
router.get("/", protect, getTransactions);

// Get a single transaction by ID
router.get("/:id", protect, getTransactionById);

// Update a transaction
router.put("/:id", updateTransaction);

// Delete a transaction
router.delete("/:id", deleteTransaction);

export default router;
