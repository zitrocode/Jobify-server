import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const add = z.object({
  body: z.object({
    name: z.string().min(1).trim(),
    description: z.string().trim().optional(),
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
