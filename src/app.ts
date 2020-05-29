import express from "express";
import { User } from "./db/models/user.model";
import { connectToDB } from "./db/mongoose";
import { Task } from "./db/models/task.model";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      console.log("User is successfully aded");
      res.status(201).send(user);
    })
    .catch((error) => {
      console.log("Can not add user");
      console.log(error);
      res.status(400).send(error);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.status(200);
      if (data === null) {
        return res.send("Can not find this user");
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send("Error");
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((data) => {
      console.log("Task is successfully added");
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log("Error.Can not create new Task");
      res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.get("/tasks/:id", (req, res) => {
  console.log("in that route");
  const id = req.params.id;
  console.log(id);
  Task.findById(id)
    .then((data) => {
      if (!data) {
        res.send();
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send("Error in dB .Can not find this task");
    });
});

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
