/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TeamServices } from "./team.service";
import { JwtPayload } from "jsonwebtoken";


const createTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const result = await TeamServices.createTeam(req.body, user as JwtPayload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Team created successfully",
        data: result
    });
});

const getTeams = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamServices.getTeams();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Team retrived successfully",
        data: result
    });
});


export const TeamController = {
    createTeam,
    getTeams
}
