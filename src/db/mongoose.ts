import mongoose, { Schema, Mongoose } from "mongoose";
import validator from "validator";

mongoose.set("useFindAndModify", false);

export const connectToDB: Promise<Mongoose> = mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
