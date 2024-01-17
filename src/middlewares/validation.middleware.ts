import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = { params: req.params, body: req.body };
      schema.parse(query);

      next();
    } catch (err) {
      res.status(500).json({
        message: "Validation failed",
        error: err,
      });
    }
  };

export default validation;
