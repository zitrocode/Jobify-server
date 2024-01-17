import { Schema, model } from "mongoose";
import { IMember } from "../types/Member";

const memberSchema = new Schema<IMember>(
  {
    role: {
      type: String,
      required: true,
      default: "observer",
    },

    user_id: Schema.ObjectId,
    project_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("Member", memberSchema);
