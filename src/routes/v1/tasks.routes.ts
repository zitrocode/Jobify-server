import { Router } from "express";
import { body, param } from "express-validator";

import * as task from "../../controllers/task.controller";
import validateToken from "../../middlewares/validateToken";
import validationErrors from "../../middlewares/validateErrors";

const router: Router = Router();

router.get("/", validateToken, task.getAll);
router.post(
  "/add",
  validateToken,
  body("name").notEmpty(),
  body("project_id").notEmpty(),
  validationErrors,
  task.add
);
router.put(
  "/update/:id",
  validateToken,
  param("id").notEmpty(),
  body("name").notEmpty(),
  validationErrors,
  task.update
);
router.delete(
  "/remove/:id",
  validateToken,
  param("id").notEmpty(),
  validationErrors,
  task.remove
);

export default router;
