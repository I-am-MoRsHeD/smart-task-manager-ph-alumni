/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { Project } from "../project/project.model";
import { Task } from "../task/task.model";
import { Reassignment } from "./reassignment.model";
import { IMember } from "../team/team.interface";
import { ITask } from "../task/task.interface";



const autoReassignTasks = async () => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const projects = await Project.find()
            .populate("linkedTeam")
            .populate("tasks")
            .session(session);

        for (const project of projects) {
            const team = project?.linkedTeam as unknown as { members?: IMember[]; save: (options?: any) => Promise<any> };
            const tasks = project?.tasks;

            if (!team || !team?.members) continue;
            if (!tasks) continue;

            for (const task of tasks) {
                const currentMember = (team?.members as IMember[]).find(m => {
                    const assigned = ((task as unknown) as ITask)?.assignedMember;
                    return m.member_no === Number(assigned);
                });
                if (!currentMember) continue;

                const isOverloaded = Number(currentMember?.currentTask) > currentMember.capacity;

                if (isOverloaded) {
                    const alternative = Array.isArray(team.members)
                        ? [...team.members]
                            .filter(m => m.member_no !== currentMember.member_no)
                            .sort((a, b) =>
                                (Number(a.currentTask) / a.capacity) - (Number(b.currentTask) / b.capacity)
                            )[0]
                        : undefined;
                    if (!alternative) continue;

                    await Task.findByIdAndUpdate(
                        task._id,
                        { assignedMember: alternative.member_no },
                        { session }
                    );

                    currentMember.currentTask = Number(currentMember.currentTask) - 1;
                    alternative.currentTask = Number(alternative.currentTask) + 1;

                    await team.save({ session });

                    await Reassignment.create(
                        [{
                            projectId: project._id,
                            taskId: task._id,
                            fromMember: currentMember.member_no,
                            toMember: alternative.member_no,
                            reason: "Auto capacity balancing"
                        }],
                        { session }
                    );
                }
            }
        }

        await session.commitTransaction();
        session.endSession();

        return;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getRecentReassignments = async () => {
    const logs = await Reassignment.find()
        .sort({ changedAt: -1 })
        .limit(10)
        .populate("taskId", "title")
        .populate("projectId", "name linkedTeam");

    const result = [];

    for (const log of logs) {
        const project = await Project.findById(log.projectId)
            .populate("linkedTeam");

        const team = project?.linkedTeam as unknown as { members?: IMember[] };
        if (!team) {
            continue;
        }
        const members = team?.members || [];

        const fromMember = members.find((m: IMember) => m.member_no === log.fromMember);
        const toMember = members.find((m: IMember) => m.member_no === log.toMember);

        result.push({
            ...log.toObject(),
            fromMember,
            toMember
        });
    }

    return result;
};



export const ReassignmentService = {
    autoReassignTasks,
    getRecentReassignments
}