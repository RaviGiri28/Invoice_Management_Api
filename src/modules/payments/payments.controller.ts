import { Request, Response } from 'express';
import {
  createPaymentService,
  getPaymentsByInvoiceService,
  getPaymentByIdService,
  deletePaymentService,
  getAllPaymentsService,
} from './payments.services';
import { sendSuccess, sendError } from '../../utils/response';
import { paymentMethod } from '../../entities/Payment';

// Create payment
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { invoiceId, amount, paymentMeth, transactionId, notes } = req.body;

    // Validate required fields
    if (!invoiceId || !amount || !paymentMeth) {
      return sendError(res, 'Invoice id, amount and payment method are required!', 400);
    }

    // Validate payment method
    if (!Object.values(paymentMethod).includes(paymentMeth)) {
      return sendError(
        res,
        'Invalid payment method! Must be cash, bank_transfer, credit_card or upi',
        400
      );
    }

    const payment = await createPaymentService(
      invoiceId,
      amount,
      paymentMeth,
      transactionId,
      notes
    );

    return sendSuccess(res, payment, 'Payment created successfully!', 201);
  } catch (error: any) {
    return sendError(res, error.message, 400);
  }
};

// Get all payments for an invoice
export const getPaymentsByInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceId = parseInt(req.params['invoiceId'] as string);
    const payments = await getPaymentsByInvoiceService(invoiceId);
    return sendSuccess(res, payments, 'Payments fetched successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 404);
  }
};

// Get single payment
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const payment = await getPaymentByIdService(id);
    return sendSuccess(res, payment, 'Payment fetched successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 404);
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsService();
    return sendSuccess(res, payments, 'Payments fetched successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

// Delete payment
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params['id'] as string);
    const result = await deletePaymentService(id);
    return sendSuccess(res, result, 'Payment deleted successfully!');
  } catch (error: any) {
    return sendError(res, error.message, 400);
  }
};