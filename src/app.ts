import express from 'express'
import { ENV } from './config/env'
import authRoutes from './modules/auth/auth.routes';
import { protect } from './middlewares/auth.middleware';
import customerRoutes from './modules/customers/customer.routes';
import productRoutes from './modules/products/products.routes';
import invoiceRoutes from './modules/invoices/invoice.routes';
import paymentRoutes from './modules/payments/payments.routes';
const app = express();

app.use(express.json());
app.get('/',(req, res)=>{
    res.json({
        message: 'Invoice API is running!'
    });
});

app.use('/api/auth/', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes );
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);
app.get('/api/test', protect, (req, res) => {
  res.json({ message: 'You are authorized!', user: req.user });
});
export default app;