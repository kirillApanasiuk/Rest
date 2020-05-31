import mongoose, { Schema, Document, Query } from "mongoose";
import { SCHEMA_VALIDATION_ERROR_MESSAGES } from "../../constants/schema-validation-error-messages.constants";
import { customValidation } from "../../helpers/validation/schema-validation/schema-validation";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUSerSchema extends Document {
  generateAuthToken(): IToken;
  name: string;
  password: string;
  email: string;
  age?: number;
  tokens: IToken[];
}

interface IToken {
  token: string;
}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate: [
      customValidation.passwordValidate,
      SCHEMA_VALIDATION_ERROR_MESSAGES.PASSWORD,
    ],
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: [
      customValidation.emailValidate,
      SCHEMA_VALIDATION_ERROR_MESSAGES.EMAIL,
    ],
  },

  age: {
    type: Number,
    default: 40,
    validate: [
      customValidation.ageValidate,
      SCHEMA_VALIDATION_ERROR_MESSAGES.AGE,
    ],
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this as IUSerSchema;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;
};

//
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = (await User.findOne({ email })) as IUSerSchema;
  if (!user) {
    console.log("here!");
    throw new Error("You not register !");
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("asdjf;lk ", isMatch);
    if (isMatch) {
      return user;
    } else {
      console.log("Wrong password");
      throw new Error("Invalid password");
    }
  }
};

//Hash the plain text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    //@ts-ignore
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const User = mongoose.model<IUSerSchema>("User", UserSchema);
