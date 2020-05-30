import mongoose, { Schema, Document } from "mongoose";

export interface ITaskModel extends Document {
  description: string;
  completed: boolean;
}

const TaskSchema: Schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    default: false,
  },

  completed: {
    type: Boolean,
    required: true,
  },
});

export const Task = mongoose.model<ITaskModel>("Task", TaskSchema);
