import { Request, Response } from "express";
import { registerService, loginService } from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";

export const register = async(req: Request, res:Response)=>{
    try{
        const {name, email, password}= req.body;
        if (!name|| !email|| !password) {
            return sendError(res, 'Name, email, and password are reuired!', 400);
        }
        const user = await registerService(name, email, password);
        return sendSuccess(res, user, 'User registered successfully!', 201);
    }catch(error: any){
        return sendError(res, error.message, 400);
    }
};

export const login = async (req: Request, res:Response)=>{
    try{
        const {email, password}= req.body;
        if (!email||!password) {
            return sendError(res, 'Email and password are required!', 400);
        }

        const data= await loginService(email, password);
        return sendSuccess(res, data, 'Login Successfull');
    }catch(error:any){
        return sendError(res, error.message,400);
    }
};