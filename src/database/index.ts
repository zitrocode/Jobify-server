import mongoose from "mongoose";

export const init = async () => {
  const USERNAME = process.env.MG_USERNAME || "";
  const PASSWORD = process.env.MG_PASSWORD || "";

  let URI: string = "";
  if (process.env.MG_URI) {
    URI = process.env.MG_URI.replace("<username>", USERNAME).replace(
      "<password>",
      PASSWORD
    );
  }

  return await mongoose.connect(URI);
};
