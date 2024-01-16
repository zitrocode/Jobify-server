import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { encrypt, compare } from "../utils/encrypt";

import AuthModel from "../models/user.model";
import { generateToken } from "../utils/jwt";

const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existUser = await AuthModel.findOne({ username }).exec();

    if (existUser) {
      return res.status(400).json({ error: "Already existing user" });
    }

    const hashPassword = encrypt(password);
    const newUser = await AuthModel.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existUser = await AuthModel.findOne({ username }).exec();

    if (!existUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!compare(password, existUser.password)) {
      return res.status(400).json({ error: "Fields do not match" });
    }

    // Generate token for user
    const token = generateToken({
      id: existUser.id,
      username: existUser.username,
    });
    res.status(200).json({ message: "Login user", token });
  } catch (err) {
    console.log(err);
  }
};

export { register, login };
