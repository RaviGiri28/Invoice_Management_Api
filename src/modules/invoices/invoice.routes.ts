import { Router } from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
} from './invoice.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/create', protect, createInvoice);
router.get('/', protect, getAllInvoices);
router.get('/:id', protect, getInvoiceById);
router.put('/:id/status/update', protect, updateInvoiceStatus);
router.delete('/:id/delete', protect, deleteInvoice);

export default router;