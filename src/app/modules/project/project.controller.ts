/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";


const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const payload = {
        ...req.body,
        creator: user.userId
    }

    const result = await ProjectServices.createProject(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Project created successfully",
        data: result
    });
});

const getProjectById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await ProjectServices.getProjectById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Project retrived successfully",
        data: result
    });
});

const getProjects = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProjectServices.getProjects();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All projects retrived successfully",
        data: result
    });
});


export const ProjectController = {
    createProject,
    getProjectById,
    getProjects
}