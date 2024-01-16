import { Schema, model } from "mongoose";
import { ISpace } from "src/types/Space";

const SpaceSchema = new Schema<ISpace>(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: Schema.ObjectId,
    project_id: Schema.ObjectId,
    description: String,
  },
  { timestamps: true }
);

export default model("space", SpaceSchema);
