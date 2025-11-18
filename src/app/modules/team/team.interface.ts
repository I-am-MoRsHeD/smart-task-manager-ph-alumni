import { Types } from "mongoose";

export interface IMember {
    member_no: number;
    name: string;
    role: string;
    capacity: number;
}

export interface ITeam {
    _id?: Types.ObjectId;
    name: string;
    createdBy: Types.ObjectId;
    members: IMember[]
}