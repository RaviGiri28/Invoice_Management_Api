import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./products.controller";
import { protect } from "../../middlewares/auth.middleware";

const router= Router();

router.post('/create', protect, createProduct);
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);
router.put('/:id/update', protect, updateProduct);
router.delete('/:id/delete', protect, deleteProduct);

export default router;