import { Request, Response, NextFunction } from "express";
import { LocalStorage } from "node-localstorage";
import { JwtPayload } from "jsonwebtoken";

import { ISession, compareToken } from "../utils/jwt";

const localStorage = new LocalStorage("./scratch");

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string[] =
      req.headers.authorization?.split(" ") || ([] as string[]);

    if (!token[1]) {
      return res.status(401).json({ error: "Propociona el TOKEN" });
    }

    const playload = compareToken(token[1]) as JwtPayload;
    if (!playload) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const newSession: ISession = {
      id: playload.id,
      username: playload.username,
    };

    // Change to `cookie-parser` or `express-session`
    localStorage.setItem("session", JSON.stringify([newSession]));
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

export default validateToken;
