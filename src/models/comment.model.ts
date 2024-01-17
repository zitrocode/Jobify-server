import { Schema, model } from "mongoose";
import { IComment } from "../types/Comment";

const commentSchema = new Schema<IComment>(
  {
    message: {
      type: String,
      required: true,
    },

    user_id: Schema.ObjectId,
    task_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
