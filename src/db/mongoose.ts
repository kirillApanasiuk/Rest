import mongoose, { Schema, Mongoose } from "mongoose";
import validator from "validator";

export const connectToDB: Promise<Mongoose> = mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
