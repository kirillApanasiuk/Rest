import express from "express";
import { connectToDB } from "./db/mongoose";
import { userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";

const app = express();
app.use(userRouter, taskRouter);
app.use(express.json());

console.log(process.env.PORT);
const port = process.env.PORT || 3001;

connectToDB
  .then((data) => {
    console.log("Successfully connected to DB");
    app.listen(port, () => {
      console.log("Server is running on port ", port);
    });
  })
  .catch((error) => {
    console.log("Can not connect to DB");
  });
