import { Router } from "express";
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from "./customer.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post('/', protect, createCustomer);
router.get('/', protect, getAllCustomers);
router.get('/:id', protect, getCustomerById);
router.put('/:id', protect, updateCustomer);
router.delete('/:id', protect, deleteCustomer);

export default router;