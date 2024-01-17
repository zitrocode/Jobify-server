import { Schema, model } from "mongoose";
import { IProject } from "../types/Project";

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    user_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("Project", projectSchema);
