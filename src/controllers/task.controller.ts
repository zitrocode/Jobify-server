import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { LocalStorage } from "node-localstorage";

import TaskModel from "../models/task.model";
import SpaceModel from "../models/space.model";
import { ISession } from "../utils/jwt";
import ProjectModel from "../models/project.model";

const localStorage = new LocalStorage("./scratch");

export const getAll = async (req: Request, res: Response) => {
  try {
    // Change to cookies
    const getSession = localStorage.getItem("session");
    const session: ISession = JSON.parse(getSession || "[]")[0];

    const getTasks = await TaskModel.find({ user_id: session.id }).exec();
    res.status(200).json({ username: session.username, tasks: getTasks });
  } catch (err) {
    console.error(err);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    // Change to cookies
    const getSession = localStorage.getItem("session");
    const session: ISession = JSON.parse(getSession || "[]")[0];

    const { name, tags, space_id, project_id } = req.body;
    let currentSpace;

    if (!isValidObjectId(space_id) && space_id) {
      return res.status(400).json({ error: "The space is invalid" });
    } else {
      currentSpace = await SpaceModel.findOne({
        _id: space_id,
        user_id: session.id,
      }).exec();
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
      user_id: session.id,
      space_id: currentSpace ? currentSpace.id : null,
      project_id: currentProject.id,
    });
    res.status(200).json({ message: "Task created", data: newTask });
  } catch (err) {
    console.error(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    // Change to cookies
    const getSession = localStorage.getItem("session");
    const session: ISession = JSON.parse(getSession || "[]")[0];

    const { id } = req.params;
    const { name, tags, space_id, isCompleted } = req.body;

    const currentTask = await TaskModel.findOne({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!currentTask) {
      return res.status(400).json({ error: "The task is invalid" });
    }

    if (currentTask.user_id.toString() !== session.id) {
      return res
        .status(400)
        .json({ error: "The user does not have access to this task" });
    }

    await TaskModel.findByIdAndUpdate(id, {
      name,
      tags: tags || currentTask.tags,
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
    // Change to cookies
    const getSession = localStorage.getItem("session");
    const session: ISession = JSON.parse(getSession || "[]")[0];

    const { id } = req.params;

    const currentTask = await TaskModel.findOne({
      _id: id,
      user_id: session.id,
    }).exec();

    if (!currentTask) {
      return res.status(400).json({ error: "The task is invalid" });
    }

    if (currentTask.user_id.toString() !== session.id) {
      return res
        .status(400)
        .json({ error: "The user does not have access to this task" });
    }

    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};
