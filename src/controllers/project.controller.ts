import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";

import ProjectModel from "../models/project.model";
import { ISession } from "../utils/jwt";

const localStorage = new LocalStorage("./scratch");

export const get = async (req: Request, res: Response) => {
  try {
    // Change to `express-session`
    const session: ISession = JSON.parse(
      localStorage.getItem("session") as string
    )[0];

    const getSpaces = await ProjectModel.find({ user_id: session.id }).exec();
    res.status(200).json({ message: "Get all projects", data: getSpaces });
  } catch (err) {
    console.error(err);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    // Change to `express-session`
    const session: ISession = JSON.parse(
      localStorage.getItem("session") as string
    )[0];

    const { name, description } = req.body;

    const newSpace = await ProjectModel.create({
      name,
      user_id: session.id,
      description: description || null,
    });

    res.status(200).json({
      message: "The project has been created successfully",
      data: newSpace,
    });
  } catch (err) {
    console.error(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    // Change to `express-session`
    const session: ISession = JSON.parse(
      localStorage.getItem("session") as string
    )[0];

    const { id } = req.params;
    const { name, description } = req.body;

    const currentSpaces = await ProjectModel.findOne({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!currentSpaces) {
      return res.status(400).json({ error: "Project does not exist" });
    }

    await ProjectModel.findOneAndUpdate(
      { _id: id, user_id: session.id },
      {
        name: name || currentSpaces.name,
        description: description || currentSpaces.description,
      }
    ).exec();

    res.status(200).json({
      message: "The project was updated successfully",
      data: {
        id,
        name,
        description,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    // Change to `express-session`
    const session: ISession = JSON.parse(
      localStorage.getItem("session") as string
    )[0];

    const { id } = req.params;

    const existSpace = await ProjectModel.exists({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!existSpace) {
      return res.status(200).json({ message: "Project does not exist" });
    }

    await ProjectModel.findOneAndDelete({
      _id: id,
      user_id: session.id,
    }).exec();
    res.status(200).json({ message: "Remove project" });
  } catch (err) {
    console.error(err);
  }
};
