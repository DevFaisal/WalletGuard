import mongoose from "mongoose";
import { MONGODB_URI, WebAppName } from "../utils/config.js";

export async function connect() {
  try {
    await mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected");
    });
    connection.on("error", (err) => {
      console.log("Error connecting to database", err);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}
