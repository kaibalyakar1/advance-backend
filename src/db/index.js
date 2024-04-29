import mongoose, { connect } from "mongoose";

import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    await console.log("Connected to MongoDB");

    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("MongoDb connection error", error);
    throw error;
  }
};

export default connectDb;
