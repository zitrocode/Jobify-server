import { Router } from "express";
import { body } from "express-validator";

import { login, register } from "../../controllers/user.controller";
import validationErrors from "../../middlewares/validateErrors";

const router: Router = Router();

router.post(
  "/login",
  body("username").trim().notEmpty(),
  body("password").notEmpty(),
  validationErrors,
  login
);

router.post(
  "/register",
  body("username").trim().notEmpty(),
  body("password").notEmpty(),
  validationErrors,
  register
);

export default router;
