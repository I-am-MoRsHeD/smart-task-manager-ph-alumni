import { Router } from "express";
import { ReassignmentController } from "./reassignment.controller";
import { checkAuth } from "../../utils/checkAuth";


const router = Router();

router.get('/',
    checkAuth(),
    ReassignmentController.getRecentReassignments);

router.post('/',
    checkAuth(),
    ReassignmentController.autoReassignTasks);

export const reassignmentRoutes = router;