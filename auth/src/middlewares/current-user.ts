import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors";
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

export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // Check Session
    if(!req.session?.jwt) {
        return next();
    }
    try {
        // Generate Jwt
        const payload = JwtManager.validate(req.session.jwt) as UserPayload;
        req.currentUser = payload;
        return res.json({
            currentUser: payload
        });
    } catch (error) {}
    next();
};