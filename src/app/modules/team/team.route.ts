import { Router } from "express";
import { TeamController } from "./team.controller";
import { validateSchema } from "../../middleware/validateSchema";
import { createTeamZodSchema} from "./team.validation";
import { checkAuth } from "../../utils/checkAuth";

const router = Router();


router.get('/', TeamController.getTeams);

router.post('/create',
    checkAuth(),
    validateSchema(createTeamZodSchema),
    TeamController.createTeam);

export const teamRoutes = router;