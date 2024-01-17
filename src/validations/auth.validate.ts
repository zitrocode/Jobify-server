import { z } from "zod";

export const login = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "username or email is required",
      })
      .trim()
      .min(1),
    password: z.string({ required_error: "password is required" }).min(8),
  }),
});

export const register = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
      })
      .min(1)
      .trim(),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "Invalid email address" })
      .trim(),
    username: z
      .string({
        required_error: "username is required",
      })
      .min(5)
      .trim(),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(8)
      .trim(),
  }),
});
