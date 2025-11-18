import { model, Schema } from "mongoose";
import { IMember, ITeam } from "./team.interface";

const memberSchema = new Schema<IMember>({
    member_no: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    capacity: { type: Number, required: true },
}, {
    _id: false
}
);

const teamSchema = new Schema<ITeam>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    members: {
        type: [memberSchema],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Team = model<ITeam>("Team", teamSchema);