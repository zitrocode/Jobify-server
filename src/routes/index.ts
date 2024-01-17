import { Router } from "express";

import authRouters from "./v1/auth.routes";
import projectsRouter from "./v1/project.routes";
import spacesRouters from "./v1/space.routes";
import tasksRouters from "./v1/tasks.routes";

const router: Router = Router();

// Routes for API v1
router.use("/v1/auth", authRouters);
router.use("/v1/projects", projectsRouter);
router.use("/v1/spaces", spacesRouters);
router.use("/v1/tasks", tasksRouters);

export default router;
