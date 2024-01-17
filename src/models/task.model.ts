import { Schema, model } from "mongoose";
import { ITask } from "../types/Task";

const taskSchema = new Schema<ITask>(
  {
    name: String,
    description: {
      type: String,
      required: false,
      default: null,
    },
    tags: {
      type: String,
      required: false,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    importance: {
      type: String,
      default: null,
    },
    deadline: Date,

    user_id: Schema.ObjectId,
    space_id: Schema.ObjectId,
    project_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
