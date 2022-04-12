import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectToDatabase = async () => {
  try {
    const mongo = await mongoose.connect(MONGO_URI);
    console.log(
      `connected to database ${mongo.connection.db.databaseName} on ${mongo.connection.host}:${mongo.connection.port}`
    );
  } catch (error) {
    throw error;
  }
};
