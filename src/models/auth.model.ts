import { Schema, model } from "mongoose";
import { IAuth } from "../types/Auth";

const authSchema = new Schema<IAuth>(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

export default model("Auth", authSchema);
