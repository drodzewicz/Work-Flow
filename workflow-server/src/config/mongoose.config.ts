import mongoose from "mongoose";
import { env } from "./env.config.js";

const databaseConnect = async () => {
  try {
    await mongoose.connect(env.db.database);
    console.log("Connected to database");
  } catch (err) {
    console.log("Failed to connected to database");
    console.error(err);
    process.exit(1);
  }
};

export { databaseConnect };
