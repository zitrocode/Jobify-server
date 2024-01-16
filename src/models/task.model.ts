import { Schema, model } from "mongoose";
import { ITask } from "src/types/Task";

const TaskSchema = new Schema<ITask>(
  {
    name: String,
    user_id: Schema.ObjectId,
    space_id: {
      type: Schema.ObjectId,
      required: false,
    },
    project_id: Schema.ObjectId,
    tags: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("task", TaskSchema);
