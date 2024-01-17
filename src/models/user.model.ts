import { Schema, model } from "mongoose";
import { IUser } from "../types/User";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: false,
      default: null,
    },
    profile_picture: {
      type: String,
      required: false,
      default: null,
    },

    auth_id: Schema.ObjectId,
  },
  { timestamps: true }
);

export default model("User", userSchema);
