import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const add = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),
    tags: z.string().trim().optional(),
    isCompleted: z.boolean().optional(),
    importance: z.string().trim().optional(),
    deadline: z.date().optional(),

    project_id: z.string().refine((val) => isValidObjectId(val), "Invalid id"),
    space_id: z.string().refine((val) => isValidObjectId(val), "Invalid id"),
  }),
});

export const update = z.object({
  params: z.object({
    id: z.string().refine((val) => isValidObjectId(val), "Invalid id"),
  }),
  body: z.object({
    body: z.object({
      name: z.string().trim().min(1).optional(),
      description: z.string().trim().optional(),
      tags: z.string().trim().optional(),
      isCompleted: z.boolean().optional(),
      importance: z.string().trim().optional(),
      deadline: z.date().optional(),

      space_id: z.string().refine((val) => isValidObjectId(val), "Invalid id"),
    }),
  }),
});

export const remove = update.pick({ params: true });
