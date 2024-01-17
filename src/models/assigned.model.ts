import { Schema, model } from "mongoose";
import { IAssigned } from "../types/Assigned";

const assignedSchema = new Schema<IAssigned>(
  {
    user_id: Schema.ObjectId,
    task_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("Assigned", assignedSchema);
