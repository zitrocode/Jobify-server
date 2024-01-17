import mongoose from "mongoose";
import config from "../config";

export const connect = async (): Promise<void> => {
  try {
    const connection = config.database.uri
      .replace("<username>", config.database.username)
      .replace("<password>", config.database.password);

    await mongoose.connect(connection);
  } catch (err) {
    if (err instanceof Error) {
      return console.log(`Error connecting to database: ${err.message}`);
    }

    console.error("An unexpected error occurred:", err);
  }
};
