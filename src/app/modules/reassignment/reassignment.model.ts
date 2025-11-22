import { Schema, model, Types } from "mongoose";

const reassignmentLogSchema = new Schema(
    {
        projectId: {
            type: Types.ObjectId,
            ref: "Project",
            required: true
        },
        taskId: {
            type: Types.ObjectId,
            ref: "Task",
            required: true
        },
        fromMember: { type: Number, required: true },
        toMember: { type: Number, required: true },
        reason: { type: String, default: "Auto Reassign" },
    },
    {
        timestamps: { createdAt: "changedAt" },
        versionKey: false
    }
);

export const Reassignment = model("Reassignment", reassignmentLogSchema);
