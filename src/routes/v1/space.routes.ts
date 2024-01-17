import { Router } from "express";

import * as controller from "../../controllers/space.controller";
import authentication from "../../middlewares/auth.middleware";
import validation from "../../middlewares/validation.middleware";

import * as validate from "../../validations/space.validate";

const router: Router = Router();

router.get("/", authentication, controller.getAll);
router.post("/add", authentication, validation(validate.add), controller.add);
router.put("/update/:id", authentication, controller.update);
router.delete("/remove/:id", authentication, controller.remove);

export default router;
