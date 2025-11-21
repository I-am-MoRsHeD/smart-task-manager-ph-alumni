import { Router } from "express";
import { MetaController } from "./stats.controller";
import { checkAuth } from "../../utils/checkAuth";


const router = Router();

router.get('/',
    checkAuth(),
    MetaController.getDashboardData);

export const metaRoutes = router;