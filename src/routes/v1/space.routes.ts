import { Router } from "express";
import { body } from "express-validator";

import * as space from "../../controllers/space.controller";
import validateToken from "../../middlewares/validateToken";
import validationErrors from "../../middlewares/validateErrors";

const router: Router = Router();

router.get("/", validateToken, space.getAll);
router.post(
  "/add",
  validateToken,
  body("name").notEmpty(),
  body("project_id").notEmpty(),
  validationErrors,
  space.add
);
router.put("/update/:id", validateToken, space.update);
router.delete("/remove/:id", validateToken, space.remove);

export default router;
