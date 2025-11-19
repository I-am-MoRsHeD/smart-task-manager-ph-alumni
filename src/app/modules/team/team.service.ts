import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { ITeam } from "./team.interface";
import { Team } from "./team.model";



const createTeam = async (payload: Partial<ITeam>, decodedUser: JwtPayload): Promise<ITeam> => {

    const isTeamNameExist = await Team.findOne({ name: payload.name });

    if (isTeamNameExist) {
        throw new AppError(400, "Team name has already been taken")
    };

    const updatedPayload = {
        ...payload,
        createdBy: decodedUser.userId
    }

    const result = await Team.create(updatedPayload);

    return result;
};

const getTeams = async () => {
    const teams = await Team.find()
        .populate("createdBy")
        .populate("members");

    return teams;
};


export const TeamServices = {
    createTeam,
    getTeams
};