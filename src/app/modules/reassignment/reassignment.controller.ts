/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReassignmentService } from "./reassignment.service";

const autoReassignTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReassignmentService.autoReassignTasks();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reassignment of tasks completed successfully",
        data: result
    });
});

const getRecentReassignments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReassignmentService.getRecentReassignments();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reassignment logs retrived successfully",
        data: result
    });
});


export const ReassignmentController = {
    autoReassignTasks,
    getRecentReassignments
}