import express from "express";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cors from "cors";
import { connect } from "./db/connect.js";

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to WalletGuard API");
});

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
  connect()
    .then(() => {
      console.log(`Server running on port ${port}`);
      console.log("🟢 Database connected");
    })
    .catch((error) => {
      console.log("Error connecting to database", error);
    });
});
