import express from "express";
import { IUSerSchema, User } from "../db/models/user.model";
import { auth } from "../middleware/auth.middleware";

export const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.get(
  "/users/me",
  auth,
  async (req: express.Request, res: express.Response) => {
    //@ts-ignore
    res.send(req.user);
  }
);

userRouter.post("/users/logout", auth, async (req, res) => {
  try {
    //@ts-ignore

    //@ts-ignore
    req.user.tokens = req.user.tokens.filter(
      //@ts-ignore
      (currentToken) => {
        //@ts-ignore
        return currentToken.token !== req.token;
      }
    );

    console.log("///////////////////////////////");
    //@ts-ignore
    //@ts-ignore
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

userRouter.post("/users/logoutAll", auth, async (req, res) => {
  try {
    //@ts-ignore
    req.user.tokens = [];
    //@ts-ignore
    await req.user.save();
    //@ts-ignore
    res.send(req.user);
  } catch (e) {
    res.status(500).send({});
  }
});

userRouter.post("/users/login", async (req, res) => {
  console.log("here");
  try {
    //@ts-ignore
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(500).send({ error: e });
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
    const user = await User.findById(req.params.id);

    if (user) {
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
    }

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
