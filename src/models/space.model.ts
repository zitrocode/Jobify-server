import { Schema, model } from "mongoose";
import { ISpace } from "../types/Space";

const spaceSchema = new Schema<ISpace>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },

    user_id: Schema.ObjectId,
    project_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("Space", spaceSchema);
