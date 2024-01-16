import { Router } from "express";
import { body, param } from "express-validator";

import * as projects from "../../controllers/project.controller";
import validateToken from "../../middlewares/validateToken";

const router: Router = Router();

router.get("/", validateToken, projects.get);
router.post(
  "/add",
  validateToken,
  body("name").notEmpty(),
  body("project_id").notEmpty(),
  projects.add
);
router.put(
  "/update/:id",
  validateToken,
  param("id").notEmpty(),
  projects.update
);
router.delete(
  "/remove/:id",
  validateToken,
  param("id").notEmpty(),
  projects.remove
);

export default router;
