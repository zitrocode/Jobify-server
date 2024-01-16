import { Router } from "express";

import authRouters from "./auth.routes";
import spacesRouters from "./space.routes";
import tasksRouters from "./tasks.routes";
import projectsRouter from "./project.routes";

const router: Router = Router();

router.use("/auth", authRouters);
router.use("/spaces", spacesRouters);
router.use("/tasks", tasksRouters);
router.use("/projects", projectsRouter);

export default router;
