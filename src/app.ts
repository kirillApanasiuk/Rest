import express from "express";
import { connectToDB } from "./db/mongoose";
import { userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";
import { auth } from "./middleware/auth.middleware";

const app = express();

app.use(express.json());
app.use(userRouter, taskRouter);

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
