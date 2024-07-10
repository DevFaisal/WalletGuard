import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cors from "cors";
import { connect } from "./db/connect.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to WalletGuard API");
});

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  connect()
    .then(() => {
      console.log(`Server running on port ${PORT}`);
      console.log("🟢 Database connected");
    })
    .catch((error) => {
      console.log("Error connecting to database", error);
    });
});
