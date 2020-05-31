import express from "express";
import { Task, ITaskModel } from "../db/models/task.model";

export const taskRouter = express.Router();

taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask: ITaskModel | null = await Task.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTask) {
      res.status(404).send("Can not find this task");
    }
    res.send(deletedTask);
  } catch (e) {
    res.status(500).send(e);
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  const updates: string[] = Object.keys(req.body);
  const availableFields: string[] = ["description", "completed"];
  const isValid: boolean = updates.every((update) =>
    availableFields.includes(update)
  );

  if (!isValid) {
    res.status(404).send({ error: "Invalid fields for update" });
  }

  try {
    const updatedTask: ITaskModel | null = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedTask) {
      res.send(404).send();
    }

    res.send(updatedTask);
  } catch (error) {
    res.status(404).send();
  }
});

taskRouter.post("/tasks", async (req, res) => {
  const task: ITaskModel = new Task(req.body);

  try {
    const savedTask: ITaskModel = await task.save();
    res.send(savedTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks: ITaskModel[] = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
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
