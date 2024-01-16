import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";

import SpaceModel from "../models/space.model";
import { ISession } from "../utils/jwt";
import ProjectModel from "../models/project.model";

const localStorage = new LocalStorage("./scratch");

export const getAll = async (req: Request, res: Response) => {
  try {
    // Change to `express-session`
    const session: ISession = JSON.parse(
      localStorage.getItem("session") as string
    )[0];

    const getSpaces = await SpaceModel.find({ user_id: session.id }).exec();
    res.status(200).json({ message: "Get all spaces", data: getSpaces });
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

    const { name, description, project_id } = req.body;

    const currentProject = await ProjectModel.findOne({
      _id: project_id,
      user_id: session.id,
    });

    if (!currentProject) {
      return res.status(400).json({ error: "The project is invalid" });
    }

    const newSpace = await SpaceModel.create({
      name,
      user_id: session.id,
      description: description || null,
      project_id: currentProject.id,
    });

    res.status(200).json({
      message: "The space has been created successfully",
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

    const currentSpaces = await SpaceModel.findOne({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!currentSpaces) {
      return res.status(400).json({ error: "Space does not exist" });
    }

    await SpaceModel.findOneAndUpdate(
      { _id: id, user_id: session.id },
      {
        name: name || currentSpaces.name,
        description: description || currentSpaces.description,
      }
    ).exec();

    res.status(200).json({
      message: "The space was updated successfully",
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

    const existSpace = await SpaceModel.exists({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!existSpace) {
      return res.status(200).json({ message: "Space does not exist" });
    }

    await SpaceModel.findOneAndDelete({ _id: id, user_id: session.id }).exec();
    res.status(200).json({ message: "Remove space" });
  } catch (err) {
    console.error(err);
  }
};
