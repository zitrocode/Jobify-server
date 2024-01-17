import { Response } from "express";
import { Request } from "../types/Request";
import { isValidObjectId } from "mongoose";

import TaskModel from "../models/task.model";
import SpaceModel from "../models/space.model";
import ProjectModel from "../models/project.model";

export const getAll = async (req: Request, res: Response) => {
  try {
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

    const getTasks = await TaskModel.find({ user_id: session.id }).exec();
    res.status(200).json({ message: "Get All Tasks", tasks: getTasks });
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

    const {
      name,
      description,
      importance,
      tags,
      deadline,
      space_id,
      project_id,
    } = req.body;

    if (!isValidObjectId(space_id) && space_id) {
      return res.status(400).json({ error: "The space is invalid" });
    }

    const currentSpace = await SpaceModel.findOne({
      _id: space_id,
      user_id: session.id,
    }).exec();

    if (!currentSpace) {
      return res.status(400).json({ error: "The space is invalid" });
    }

    if (!isValidObjectId(project_id) && project_id) {
      return res.status(400).json({ error: "The project is invalid" });
    }

    const currentProject = await ProjectModel.findOne({
      _id: project_id,
      user_id: session.id,
    }).exec();

    if (!currentProject) {
      return res.status(400).json({ error: "The project is invalid" });
    }

    const newTask = await TaskModel.create({
      name,
      tags,
      description,
      importance,
      deadline,
      user_id: session.id,
      space_id: currentSpace.id,
      project_id: currentProject.id,
    });
    res.status(200).json({ message: "Task created", data: newTask });
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
    const { name, tags, description, importance, space_id, isCompleted } =
      req.body;

    const currentTask = await TaskModel.findOne({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!currentTask) {
      return res.status(400).json({ error: "The task is invalid" });
    }

    await TaskModel.findByIdAndUpdate(id, {
      name,
      tags: tags || currentTask.tags,
      description: description || currentTask.description,
      importance: importance || currentTask.importance,
      space_id: space_id || currentTask.space_id,
      isCompleted: isCompleted || currentTask.isCompleted,
    });

    res.status(200).json({
      code: 200,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const session = req.user;
    if (!session) {
      return res.status(401).json({ message: "Session invalid" });
    }

    const { id } = req.params;

    const currentTask = await TaskModel.findOne({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!currentTask) {
      return res.status(400).json({ error: "The task is invalid" });
    }

    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};
