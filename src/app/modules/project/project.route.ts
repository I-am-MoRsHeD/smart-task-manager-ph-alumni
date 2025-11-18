import { Router } from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../utils/checkAuth";
import { validateSchema } from "../../middleware/validateSchema";
import { createProjectZodSchema } from "./project.validation";


const router = Router();


router.get('/',
    checkAuth(),
    ProjectController.getProjects);

router.get('/:id',
    checkAuth(),
    ProjectController.getProjectById);

router.post('/create',
    checkAuth(),
    validateSchema(createProjectZodSchema),
    ProjectController.createProject);


export const projectRoutes = router;