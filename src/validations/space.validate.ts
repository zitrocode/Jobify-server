import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const add = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),

    project_id: z.string().refine((val) => isValidObjectId(val), "Invalid id"),
  }),
});

export const update = z.object({
  params: z.object({
    id: z.string().refine((val) => isValidObjectId(val), "Invalid id"),
  }),
  body: z.object({
    name: z.string().min(1).trim().optional(),
    description: z.string().min(1).trim().optional(),
  }),
});

export const remove = update.pick({ params: true });
