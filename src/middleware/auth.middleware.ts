import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded: any = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    console.log(token);
    req.token = token;

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: "Please auth for this request" });
  }
};
