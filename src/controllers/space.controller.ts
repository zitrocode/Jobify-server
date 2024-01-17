import { Response } from "express";
import { Request } from "../types/Request";

import SpaceModel from "../models/space.model";
import ProjectModel from "../models/project.model";

export const getAll = async (req: Request, res: Response) => {
  try {
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

    const getSpaces = await SpaceModel.find({ user_id: session.id }).exec();
    res.status(200).json({ message: "Get all spaces", data: getSpaces });
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
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

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
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

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
