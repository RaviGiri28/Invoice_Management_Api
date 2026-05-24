import { Router } from 'express';
import {
  createPayment,
  getPaymentsByInvoice,
  getPaymentById,
  deletePayment,
  getAllPayments,
} from './payments.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();
router.get('/', protect, getAllPayments);
// Create payment
router.post('/create', protect, createPayment);
// Get all payments for a specific invoice
router.get('/invoice/:invoiceId', protect, getPaymentsByInvoice);
// Get single payment
router.get('/:id', protect, getPaymentById);
// Delete payment
router.delete('/:id/delete', protect, deletePayment);

export default router;