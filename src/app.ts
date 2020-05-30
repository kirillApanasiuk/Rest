import express from "express";
import { User, IUSerSchema } from "./db/models/user.model";
import { connectToDB } from "./db/mongoose";
import { Task, ITaskModel } from "./db/models/task.model";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.send(user);
    }

    res.status(404).send();
  } catch (e) {
    res.status(500).send();
  }
});

app.put("/users/:id", async (req, res) => {
  console.log(req.query);
  const query: IUpdateUserParams = req.query;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, query, {
      new: true,
    });
    console.log("here");
    res.send(updatedUser);
    console.log(req.query);
  } catch (e) {
    res.status(400).send();
  }
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(req.body);
  console.log(updates);
  const allowedUpdates = ["name", "email", "password", "email"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates: string[] = Object.keys(req.body);
  const availableFields: string[] = ["description", "completed"];
  const isValid: boolean = updates.every((update) =>
    availableFields.includes(update)
  );

  if (!isValid) {
    res.status(404).send({ error: "Invalid fields for update" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      res.send(404).send();
    }

    res.send(updatedTask);
  } catch (error) {
    res.status(404).send();
  }
});

app.post("/tasks", async (req, res) => {
  const task: ITaskModel = new Task(req.body);

  try {
    const savedTask: ITaskModel = await task.save();
    res.send(savedTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks: ITaskModel[] = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);

    if (task) {
      res.send(task);
    }

    res.status(400).send();
  } catch (e) {
    res.status(400).send(e);
  }
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

interface IUpdateUserParams {
  name?: string;
  password?: string;
  email?: string;
  age?: number;
}
