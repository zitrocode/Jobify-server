import { Router } from "express";

import * as controllers from "../../controllers/task.controller";
import authentication from "../../middlewares/auth.middleware";
import validation from "../../middlewares/validation.middleware";

import * as validate from "../../validations/space.validate";

const router: Router = Router();

router.get("/", authentication, controllers.getAll);
router.post("/add", authentication, validation(validate.add), controllers.add);
router.put(
  "/update/:id",
  authentication,
  validation(validate.update),
  controllers.update
);
router.delete(
  "/remove/:id",
  authentication,
  validation(validate.remove),
  controllers.remove
);

export default router;
