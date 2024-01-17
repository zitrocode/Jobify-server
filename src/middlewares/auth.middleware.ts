import { Response, NextFunction } from "express";
import { Request } from "../types/Request";
import { JwtPayload } from "jsonwebtoken";

import { compareToken } from "../utils/jwt.util";
import userModel from "../models/user.model";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res
        .status(401)
        .json({ error: "Unauthorized", message: "Token not provided" });
    }

    const authPlayload = compareToken(token) as JwtPayload;
    if (!authPlayload) {
      return res
        .status(403)
        .json({ error: "Unauthorized", message: "Invalid token" });
    }

    const userFound = await userModel.findOne({ auth_id: authPlayload.id });
    if (!userFound) return res.status(500).json({ message: "Not user found" });

    req.user = {
      id: userFound.id,
    };

    next();
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error ",
      message: "Something went wrong",
    });
  }
};

export default authentication;
