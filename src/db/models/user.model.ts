import mongoose, { Schema, Document } from "mongoose";
import { SCHEMA_VALIDATION_ERROR_MESSAGES } from "../../constants/schema-validation-error-messages.constants";
import { customValidation } from "../../helpers/validation/schema-validation/schema-validation";

export interface IUSerSchema extends Document {
  name: string;
  password: string;
  email: string;
  age?: number;
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
});

export const User = mongoose.model<IUSerSchema>("User", UserSchema);
