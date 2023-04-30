import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { NotAuthorizedError, RequestValidationError } from "../errors";
import { JwtManager } from "../services";

interface UserPayload {
    id: string,
    email: string
}

declare global{
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const requireAuth = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Check Session
    if(!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};