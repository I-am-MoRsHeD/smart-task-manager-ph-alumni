/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TaskServices } from "./task.service";
import { JwtPayload } from "jsonwebtoken";


const createTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TaskServices.createTask(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Task created successfully",
        data: result
    });
});

const updateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    const result = await TaskServices.updateTask(id, req.body, user as JwtPayload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Task updated successfully",
        data: result
    });
});

const deleteTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    const result = await TaskServices.deleteTask(id, user as JwtPayload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Task deleted successfully",
        data: result
    });
});


export const TaskController = {
    createTask,
    updateTask,
    deleteTask
}