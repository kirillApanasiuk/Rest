import mongoose, { Mongoose } from "mongoose";

require("dotenv").config();

mongoose.set("useFindAndModify", false);

export const connectToDB: Promise<Mongoose> = mongoose.connect(
  `${process.env.DB_CONNECTION_STRING}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
