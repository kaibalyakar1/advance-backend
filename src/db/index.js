import mongoose, { connect } from "mongoose";

import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDb connection error", error);
    throw error;
  }
};

export default connectDb;
