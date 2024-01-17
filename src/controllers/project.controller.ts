import { Response } from "express";
import { Request } from "../types/Request";

import ProjectModel from "../models/project.model";

export const get = async (req: Request, res: Response) => {
  try {
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

    const getSpaces = await ProjectModel.find({ user_id: session.id }).exec();
    res.status(200).json({ message: "Get all projects", data: getSpaces });
  } catch (err) {
    console.error(err);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

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
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

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
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

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
