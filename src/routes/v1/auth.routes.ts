import { Router } from "express";

import * as auth from "../../controllers/auth.controller";
import authentication from "../../middlewares/auth.middleware";
import validation from "../../middlewares/validation.middleware";

import * as validate from "../../validations/auth.validate";

const router: Router = Router();

router.post("/login", validation(validate.login), auth.login);
router.post("/register", validation(validate.register), auth.register);
router.get("/logout", authentication, auth.logout);

export default router;
