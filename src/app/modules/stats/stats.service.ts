import { JwtPayload } from "jsonwebtoken";
import { Project } from "../project/project.model";
import { Team } from "../team/team.model";


const getDashboardData = async (decodedUser: JwtPayload) => {
    const allProjects = await Project.find({ creator: decodedUser?.userId });

    const allTasks = allProjects?.map((project) => project.tasks)?.length;

    const teams = await Team.find({ createdBy: decodedUser?.userId });

    return {
        allProjects: allProjects?.length,
        allTasks,
        teams,
    }
};


export const MetaService = {
    getDashboardData
};