require("module-alias/register");

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import * as db from "./database";
import v1Routers from "./routes/v1";

dotenv.config();
const PORT: number = Number(process.env.PORT);

const App: Express = express();
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Homepage :D" });
});

App.use("/api/v1", v1Routers);

App.listen(PORT, () => {
  console.info(`The server in: http://localhost:${PORT}`);
});

db.init()
  .then(() => console.log("Database conneted"))
  .catch((err) => console.error("Error", err));
