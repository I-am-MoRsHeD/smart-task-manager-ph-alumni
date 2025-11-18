import { Schema, model, Types } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        linkedTeam: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tasks: [
            {
                type: Types.ObjectId,
                ref: "Task",
                default: [],
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Project = model<IProject>("Project", projectSchema);
