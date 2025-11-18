import { model, Schema } from "mongoose";
import { ITask } from "./task.interface";
import { TaskPriority, TaskStatus } from "../../types/globalTypes";



const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedMember: {
        type: Object,
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
        default: TaskPriority.LOW
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.PENDING
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Task = model<ITask>('Task', taskSchema);