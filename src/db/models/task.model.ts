import mongoose, { Schema } from "mongoose";

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

export const Task = mongoose.model("Task", TaskSchema);
