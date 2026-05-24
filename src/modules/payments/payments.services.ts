import { AppDataSource } from '../../data-source';
import { Payment, paymentMethod } from '../../entities/Payment';
import { Invoice, InvoiceStatus } from '../../entities/Invoice';

const paymentRepository = AppDataSource.getRepository(Payment);
const invoiceRepository = AppDataSource.getRepository(Invoice);

// Create payment
export const createPaymentService = async (
  invoiceId: number,
  amount: number,
  paymentMethod: paymentMethod,
  transactionId: string,
  notes: string
) => {
  // 1. Check if invoice exists
  const invoice = await invoiceRepository.findOne({
    where: { id: invoiceId },
    relations: ['payments'],
  });
  if (!invoice) {
    throw new Error('Invoice not found!');
  }

  // 2. Check if invoice is cancelled
  if (invoice.status === InvoiceStatus.CANCELLED) {
    throw new Error('Cannot add payment to a cancelled invoice!');
  }

  // 3. Calculate total paid amount so far
const totalPaid = invoice.payments.reduce(
  (sum, payment) => sum + parseFloat(payment.amount as any),
  0
);
  // 4. Check if invoice is already fully paid
if (totalPaid >= parseFloat(invoice.total as any)) {
    throw new Error('Invoice is already fully paid!');
  }

  // 5. Check if payment amount exceeds remaining balance
  const remainingBalance = parseFloat(invoice.total as any) - totalPaid;
  if (amount > remainingBalance) {
    throw new Error(`Payment amount exceeds remaining balance of ${remainingBalance}!`);
  }

  // 6. Create payment
  const payment = paymentRepository.create({
    invoice,
    amount,
    paymentMethod,
    transactionId,
    notes,
  });

  await paymentRepository.save(payment);

  // 7. Check if invoice is now fully paid
  const newTotalPaid = totalPaid + amount;
  if (newTotalPaid >= Number(invoice.total)) {
    invoice.status = InvoiceStatus.PAID;
    await invoiceRepository.save(invoice);
  }

  return payment;
};

// Get all payments for an invoice
export const getPaymentsByInvoiceService = async (invoiceId: number) => {
  const invoice = await invoiceRepository.findOne({ where: { id: invoiceId } });
  if (!invoice) {
    throw new Error('Invoice not found!');
  }

  return await paymentRepository.find({
    where: { invoice: { id: invoiceId } },
    relations: ['invoice'],
    order: { paidAt: 'DESC' },
  });
};

// Get single payment
export const getPaymentByIdService = async (id: number) => {
  const payment = await paymentRepository.findOne({
    where: { id },
    relations: ['invoice'],
  });
  if (!payment) {
    throw new Error('Payment not found!');
  }
  return payment;
};

export const getAllPaymentsService = async () => {
  return await paymentRepository.find({
    relations: ['invoice'],
    order: { paidAt: 'DESC' },
  });
};

// Delete payment
export const deletePaymentService = async (id: number) => {
  // 1. Find payment with invoice relation
  const payment = await paymentRepository.findOne({
    where: { id },
    relations: ['invoice'],
  });
  if (!payment) {
    throw new Error('Payment not found!');
  }

  // 2. Check if invoice exists before accessing status
  if (payment.invoice && payment.invoice.status === InvoiceStatus.PAID) {
    // Load full invoice separately
    const invoice = await invoiceRepository.findOne({
      where: { id: payment.invoice.id }
    });
    if (invoice) {
      invoice.status = InvoiceStatus.SENT;
      await invoiceRepository.save(invoice);
    }
  }

  // 3. Delete payment
  await paymentRepository.remove(payment);
  return { message: 'Payment deleted successfully!' };
};