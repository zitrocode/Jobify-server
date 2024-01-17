import { Request, Response } from "express";
import { encrypt, compare } from "../utils/encrypt";

import authModel from "../models/auth.model";
import userModel from "../models/user.model";
import { createAccessToken } from "../utils/jwt.util";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password } = req.body;
    const authFound = await authModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .exec();

    if (authFound) {
      return res.status(400).json({ error: "Already existing user" });
    }

    const hashPassword = encrypt(password);
    const newAuth = await authModel.create({
      email,
      username,
      password: hashPassword,
    });

    await userModel.create({ name, auth_id: newAuth.id });

    const token = createAccessToken({
      id: newAuth.id,
    });

    res.cookie("token", token);
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const email = username.includes(".com") ? username : null;

    const authFound = await authModel
      .findOne({ $or: [{ username }, { email }] })
      .exec();

    if (!authFound) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isMatch = compare(password, authFound.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate token for user
    const token = createAccessToken({
      id: authFound.id,
    });

    res.cookie("token", token);
    res.status(200).json({ message: "User has successfully logged in" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};

const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  res.status(200).json({ message: "session has been closed" });
};

export { register, login, logout };
