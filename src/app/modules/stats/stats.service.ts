import { JwtPayload } from "jsonwebtoken";
import { Project } from "../project/project.model";
import { Team } from "../team/team.model";


const getDashboardData = async (decodedUser: JwtPayload) => {
    const allProjects = await Project.find({ creator: decodedUser?.userId });

    const allTasks = allProjects?.map((project) => project.tasks);

    const teams = await Team.find({ createdBy: decodedUser?.userId });

    const members = teams?.map(team => team.members);

    const overLoadedMembers = members[0]?.filter(member => member.capacity < (member?.currentTask as number)).length;

    return {
        allProjects: allProjects?.length,
        allTasks: allTasks[0]?.length,
        overLoadedMembers,
        members: members[0],
    }
};


export const StatsService = {
    getDashboardData
};