import mongoose from "mongoose";
import config from "../config.js";

export const connectToDB = async () => {
  try {
    const connetion = await mongoose.connect(config.mongoURI);
    console.log(`MongoDB connected: ${connetion.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
