import mongoose from "mongoose";
import { Task } from "./task.model";
import { ITask } from "./task.interface";
import { Project } from "../project/project.model";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Team } from "../team/team.model";


const createTask = async (payload: ITask) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const newTask = await Task.create([payload], { session });
        const task = newTask[0];

        if (!task) {
            throw new Error("Failed to create task");
        }

        const updatedProject = await Project.findByIdAndUpdate(
            payload.projectId,
            { $push: { tasks: task._id } },
            { session, new: true }
        ).populate("linkedTeam");

        if (!updatedProject?.linkedTeam) {
            throw new Error("No linked team found");
        }

        const linkedTeamId = updatedProject.linkedTeam._id;
        const assignedMemberNo = payload.assignedMember;

        const result = await Team.updateOne(
            {
                _id: linkedTeamId,
                "members.member_no": assignedMemberNo
            },
            {
                $inc: { "members.$.currentTask": 1 }
            },
            { session }
        );

        if (result.modifiedCount === 0) {
            throw new Error("Failed to update assigned member task count");
        }

        await session.commitTransaction();
        session.endSession();

        return task;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


const updateTask = async (id: string, payload: Partial<ITask>, decodedUser: JwtPayload) => {

    const existingTask = await Task.findById(id);

    if (!existingTask) {
        throw new AppError(404, "Task not found");
    };

    const validProject = await Project.findById(existingTask.projectId);

    if (!validProject) {
        throw new AppError(404, "Project not found!");
    };

    if (validProject.creator.toString() !== decodedUser.userId) {
        throw new AppError(403, "You are not authorized to do this")
    };

    return await Task.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
};

const deleteTask = async (id: string, decodedUser: JwtPayload) => {
    const existingTask = await Task.findById(id);

    if (!existingTask) {
        throw new AppError(404, "Task not found");
    };

    const validProject = await Project.findById(existingTask.projectId);

    if (!validProject) {
        throw new AppError(404, "Project not found!");
    };

    if (validProject.creator.toString() !== decodedUser.userId) {
        throw new AppError(403, "You are not authorized to do this")
    };

    await Task.findByIdAndDelete(id);

    return null;
};

export const TaskServices = {
    createTask,
    updateTask,
    deleteTask
};
