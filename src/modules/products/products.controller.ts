import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../../utils/response';
import { createProductService, deleteProductService, getAllProductsServices, getProductByIdServices, updateProductServices } from './product.services';

export const createProduct  = async(req: Request, res: Response)=>{
    try{
        const {name, description, price, taxRate}= req.body;

        if (!name || !price) {
            return sendError(res, 'Name and price are required!', 400);
        }
        const product = await createProductService(name, description, price, taxRate);
        return sendSuccess(res, product, 'Product created successfully!', 201);
    }catch (error : any){
        return sendError(res, error.message, 400);
    }
};

export const getAllProducts = async(req: Request, res: Response)=>{
    try{
        const products = await getAllProductsServices();
        return sendSuccess(res, products, 'Products fetched successfully!');
    }catch(error : any){
        return sendError(res, error.message, 500);
    }
};

export const getProductById = async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params['id'] as string);
        const product = await getProductByIdServices(id);
        return sendSuccess(res, product, 'Product fetched successfully!');
    }catch(error: any){
        return sendError(res, error.message, 400);
    }
};

export const updateProduct = async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params['id'] as string);
        const {name, description, price, taxRate}= req.body;

        const product = await updateProductServices(id, name, description, price, taxRate);
        return sendSuccess(res, product, 'Product updated successfully!');
    }catch(error : any){
        return sendError(res, error.message, 400);
    }
};

export const deleteProduct = async(req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params['id'] as string);
        const result= await deleteProductService(id);
        return sendSuccess(res, result, 'Product deleted successfully!');
    }catch( error : any ){
        return sendError(res, error.message, 400);
    }
};