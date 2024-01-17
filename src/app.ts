import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import v1Routers from "./routes";

const App: Express = express();
App.use(cors());
App.use(morgan("dev"));
App.use(express.json());
App.use(cookieParser());

App.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Homepage" });
});

App.use("/api", v1Routers);

export default App;
