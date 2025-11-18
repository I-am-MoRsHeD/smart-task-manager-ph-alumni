import { Router } from "express";
import { TaskController } from "./task.controller";
import { validateSchema } from "../../middleware/validateSchema";
import { createTaskZodSchema } from "./task.validation";
import { checkAuth } from "../../utils/checkAuth";



const router = Router();

router.post('/create',
    checkAuth(),
    validateSchema(createTaskZodSchema),
    TaskController.createTask);

router.patch('/:id',
    checkAuth(),
    TaskController.updateTask);

router.delete('/:id',
    checkAuth(),
    TaskController.deleteTask);

export const taskRoutes = router;