import { Types } from "mongoose";


export interface IProject {
    id: Types.ObjectId,
    name: string;
    linkedTeam: Types.ObjectId;
    creator: Types.ObjectId;
    tasks?: Types.ObjectId[];
};