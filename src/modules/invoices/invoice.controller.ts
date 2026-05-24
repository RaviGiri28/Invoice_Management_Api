import { Request, Response } from "express";
import { createInvoiceService, deleteInvoiceService, getAllInvoicesService, getInvoiceByIdService, updateInvoiceStatusService } from "./invoice.service";
import { sendError, sendSuccess } from "../../utils/response";
import { InvoiceStatus } from "../../entities/Invoice";

export const createInvoice = async( req: Request, res: Response)=>{
    try{
        const {customerId, items, discount, notes, dueDate}= req.body;

        if (!customerId || !items || items.length ===0) {
            return sendError(res, 'Customer and items are required!', 400);
        }

        const userId = req.user!.id;

        const invoice = await createInvoiceService(
            customerId, userId, items, discount, notes, dueDate
        );
        return sendSuccess(res, invoice, 'Invoice created successfully!', 201);
    }catch(error: any){
        return sendError(res, error.message, 401);
    }
};

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await getAllInvoicesService();
    return sendSuccess(res, invoices, 'Invoices fetched successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

// Get single invoice
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const invoice = await getInvoiceByIdService(id);
    return sendSuccess(res, invoice, 'Invoice fetched successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 404);
  }
};

// Update invoice status
export const updateInvoiceStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const { status } = req.body;

    // Validate status
    if (!Object.values(InvoiceStatus).includes(status)) {
      return sendError(
        res,
        'Invalid status! Must be draft, sent, paid or cancelled',
        400
      );
    }

    const invoice = await updateInvoiceStatusService(id, status);
    return sendSuccess(res, invoice, 'Invoice status updated successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 400);
  }
};

// Delete invoice
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const result = await deleteInvoiceService(id);
    return sendSuccess(res, result, 'Invoice deleted successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 400);
  }
};