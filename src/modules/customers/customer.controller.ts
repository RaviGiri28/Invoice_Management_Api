import { Request, Response } from "express";
import { createCustomerService, deleteCustomerService, getAllCustomersService, getCustomerByIdService, updateCustomerService } from "./customers.service";
import { sendError, sendSuccess } from "../../utils/response";

export const createCustomer= async(req: Request, res: Response)=>{
    try{
        const {name, email, phone, address}= req.body;

        if (!name || !email) {
            return sendError(res, 'Name and email are required!', 400);
        };
        const customer = await createCustomerService(name, email, phone, address);
        return sendSuccess(res, customer, 'Customer created successfully!', 201);
    }catch(error: any){
        return sendError(res, error.message, 400);
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomersService();
    return sendSuccess(res, customers, 'Customers fetched successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

export const getCustomerById = async(req: Request, res: Response)=>{
    try{
    const id = parseInt(req.params['id'] as string);
        const customer = await getCustomerByIdService(id);
        return sendSuccess(res, customer, 'Customer fetched successfully!');
    }catch (error: any){
        return sendError(res, error.message, 404);
    }
};

export const updateCustomer = async (req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params['id'] as string);
        const {name, email, phone, address}= req.body;
        const customer = await updateCustomerService(id, name, email, phone, address);
        return sendSuccess(res, customer, 'Customer updated successfully!');
    }catch(error : any){
        return sendError(res, error.message, 400);
    }
};

export const deleteCustomer = async(req: Request, res: Response)=>{
    try{
        const id= parseInt(req.params['id'] as string);
        const result = await deleteCustomerService(id);
        return sendSuccess(res, result, 'Customer deleted Successfully!');
    }catch(error : any){
        return sendError(res, error.message, 400);
    }
};