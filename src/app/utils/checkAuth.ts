import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/auth/auth.model";

export const checkAuth = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(403, "No token received");
        };

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;
        const isUserExist = await User.findOne({ email: verifiedToken.email });

        if (!isUserExist) {
            throw new AppError(400, 'User does not exist');
        };

        if (!verifiedToken) {
            throw new AppError(403, "You are not permitted to access!!");
        };

        req.user = verifiedToken;
        next();
    } catch (error) {
        next(error);
    }

}