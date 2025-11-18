import { Types } from "mongoose";
import { TaskPriority, TaskStatus } from "../../types/globalTypes";
import { IMember } from "../team/team.interface";


export interface ITask {
    id: Types.ObjectId,
    title: string;
    description: string;
    assignedMember: IMember;
    priority?: TaskPriority;
    status?: TaskStatus;
    projectId: Types.ObjectId
}