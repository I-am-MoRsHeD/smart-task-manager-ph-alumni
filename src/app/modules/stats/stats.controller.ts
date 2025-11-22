/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { StatsService } from "./stats.service";

const getDashboardData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const result = await StatsService.getDashboardData(user as JwtPayload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Stats data retrived successfully",
        data: result
    });
});


export const StatsController = {
    getDashboardData
}