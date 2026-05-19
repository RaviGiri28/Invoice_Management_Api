import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { sendError } from "../utils/response";

declare global{
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}

export const protect = (req: Request, res: Response, next: NextFunction)=>{
    try{
        const authHeader= req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, 'No token provided, access denied!', 401);
        }
        const token= authHeader.split(' ')[1];
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as {id:number; email: string};

        req.user = decoded;
        next();
    }catch (error) {
        return sendError(res, 'Invalid token, access denied!', 401);
    }
}