import { Router } from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../utils/checkAuth";


const router = Router();

router.get('/',
    checkAuth(),
    StatsController.getDashboardData);

export const statsRoutes = router;