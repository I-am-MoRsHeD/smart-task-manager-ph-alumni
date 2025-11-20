import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Team } from "../team/team.model";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { ITask } from "../task/task.interface";
import { IMember, ITeam } from "../team/team.interface";


const createProject = async (payload: Partial<IProject>) => {

    const existingTeam = await Team.findById(payload.linkedTeam);
    if (!existingTeam) {
        throw new AppError(404, "Team does not exist");
    };

    const isProjectNameExist = await Project.findOne({ name: payload.name });

    if (isProjectNameExist) {
        throw new AppError(400, "Project name has already been taken")
    };

    const result = await Project.create(payload);

    return result;
};

const getProjects = async (decodedUser: JwtPayload) => {

    const project = await Project.find({ creator: decodedUser?.userId })
        .populate("linkedTeam")
        .sort({ createdAt: -1 });;

    return project;
};

const getProjectById = async (id: string) => {
    const project = await Project.findById(id)
        .populate("linkedTeam")
        .populate("tasks")
        .lean();

    if (!project) {
        throw new AppError(404, "Project not found!");
    }

    const linkedTeam = (project.linkedTeam as unknown as ITeam) || null;
    if (!linkedTeam?.members) return project;

    const members = linkedTeam.members;

    const tasksWithMembers = (project.tasks as unknown as ITask[]).map((task: ITask) => {
        const assignedMemberNo =
            typeof task.assignedMember === "number"
                ? task.assignedMember
                : (task.assignedMember as IMember)?.member_no;

        const memberInfo = members.find(
            (m: IMember) => m.member_no === assignedMemberNo
        );

        return {
            ...task,
            assignedMember: memberInfo || task.assignedMember,
        };
    });

    return {
        ...project,
        tasks: tasksWithMembers,
    }
};


export const ProjectServices = {
    createProject,
    getProjectById,
    getProjects
}