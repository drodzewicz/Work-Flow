import mongoose from "mongoose";
import { env } from "./env.config.js";
import chalk from "chalk";

const databaseConnect = async () => {
    try {
        await mongoose.connect(env.db.database);
        console.log(chalk.yellow("Connected to database"));
    } catch (err) {
        console.log(chalk.red("Failed to connected to database"));
        console.error(err);
        process.exit(1);
    }
};

export { databaseConnect };
