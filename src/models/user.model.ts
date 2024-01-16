import { Schema, model } from "mongoose";
import { IUser } from "src/types/User";

const UserScheme = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

export default model("user", UserScheme);
