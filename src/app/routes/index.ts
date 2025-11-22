import { Router } from "express"
import { authRoutes } from "../modules/auth/auth.route";
import { teamRoutes } from "../modules/team/team.route";
import { taskRoutes } from "../modules/task/task.route";
import { projectRoutes } from "../modules/project/project.route";
import { statsRoutes } from "../modules/stats/stats.route";
import { reassignmentRoutes } from "../modules/reassignment/reassignment.route";


export const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/teams',
        route: teamRoutes
    },
    {
        path: '/tasks',
        route: taskRoutes
    },
    {
        path: '/projects',
        route: projectRoutes
    },
    {
        path: '/stats',
        route: statsRoutes
    },
    {
        path: '/reassignment',
        route: reassignmentRoutes
    },
];


moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
});