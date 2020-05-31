import express from "express";
import { IUSerSchema, User } from "../db/models/user.model";

export const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.get("/users/:id", async (req, res) => {
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

userRouter.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
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

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser: IUSerSchema | null = await User.findByIdAndDelete(
      req.params.id
    );
    if (!deletedUser) {
      res.status(404).send();
    }
    res.send(deletedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});
