import { Schema, model } from "mongoose";
import { IProject } from "../types/Project";

const ProjectSchema = new Schema<IProject>(
  {
    name: String,
    description: {
      type: String,
      required: false,
      default: null,
    },
    user_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("project", ProjectSchema);
