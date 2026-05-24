import { AppDataSource } from '../../data-source';
import { Invoice, InvoiceStatus } from '../../entities/Invoice';
import { InvoiceItem } from '../../entities/InvoiceItem';
import { Customer } from '../../entities/Customer';
import { Product } from '../../entities/Product';
import { User } from '../../entities/User';
import { calculateInvoiceTotals } from '../../utils/claculate';
import { generateInvoiceNumber } from './invoice-number';
import { Payment } from '../../entities/Payment';


const invoiceRepository = AppDataSource.getRepository(Invoice);
const customerRepository = AppDataSource.getRepository(Customer);
const productRepository = AppDataSource.getRepository(Product);
const userRepository = AppDataSource.getRepository(User);

// Create invoice
export const createInvoiceService = async (
  customerId: number,
  userId: number,
  items: { productId: number; quantity: number; unitPrice?: number }[],
  discount: number = 0,
  notes: string,
  dueDate: Date,
) => {
  // 1. Check if customer exists
  const customer = await customerRepository.findOne({ where: { id: customerId } });
  if (!customer) {
    throw new Error('Customer not found!');
  }

  // 2. Check if user exists
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found!');
  }

  // 3. Build items array with product details
  const itemsWithDetails = await Promise.all(
    items.map(async (item) => {
      // Find product
      const product = await productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found!`);
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice || Number(product.price), // use provided price or product price
        taxRate: Number(product.taxRate),
      };
    })
  );

  // 4. Calculate totals
  const { calculatedItems, subtotal, taxAmount, discount: disc, total } =
    calculateInvoiceTotals(itemsWithDetails, discount);

  // 5. Generate invoice number
  const invoiceNumber = await generateInvoiceNumber();

  // 6. Create invoice
  const invoice = invoiceRepository.create({
    invoiceNumber,
    customer,
    user,
    subtotal,
    taxAmount,
    discount: disc,
    total,
    notes,
    dueDate,
    status: InvoiceStatus.DRAFT,
  });

  // 7. Create invoice items
  invoice.items = calculatedItems.map((item, index) => {
    const invoiceItem = new InvoiceItem();
    invoiceItem.product = { id: item.productId } as Product;
    invoiceItem.quantity = item.quantity;
    invoiceItem.unitPrice = item.unitPrice;
    invoiceItem.taxRate = item.taxRate;
    invoiceItem.taxAmount = item.taxAmount;
    invoiceItem.total = item.total;
    return invoiceItem;
  });

  // 8. Save invoice (cascade will save items too!)
  await invoiceRepository.save(invoice);
  return invoice;
};

// Get all invoices
export const getAllInvoicesService = async () => {
  return await invoiceRepository.find({
    relations: ['customer', 'user', 'items', 'items.product'],
    order: { createdAt: 'DESC' },
  });
};

// Get single invoice
export const getInvoiceByIdService = async (id: number) => {
  const invoice = await invoiceRepository.findOne({
    where: { id },
    relations: ['customer', 'user', 'items', 'items.product', 'payments'],
  });
  if (!invoice) {
    throw new Error('Invoice not found!');
  }
  return invoice;
};

// Update invoice status
export const updateInvoiceStatusService = async (id: number, status: InvoiceStatus) => {
  const invoice = await invoiceRepository.findOne({ where: { id } });
  if (!invoice) {
    throw new Error('Invoice not found!');
  }

  invoice.status = status;
  await invoiceRepository.save(invoice);
  return invoice;
};

// Delete invoice
export const deleteInvoiceService = async (id: number) => {
  const invoice = await invoiceRepository.findOne({ where: { id },
      relations: ['items', 'payments'], // 👈 load related items and payments
});
  if (!invoice) {
    throw new Error('Invoice not found!');
  }

    // 1. Delete invoice items first
  if (invoice.items && invoice.items.length > 0) {
    const invoiceItemRepository = AppDataSource.getRepository(InvoiceItem);
    await invoiceItemRepository.remove(invoice.items);
  }

  // 2. Delete payments if any
  if (invoice.payments && invoice.payments.length > 0) {
    const paymentRepository = AppDataSource.getRepository(Payment);
    await paymentRepository.remove(invoice.payments);
  }

  await invoiceRepository.remove(invoice);
  return { message: 'Invoice deleted successfully!' };
};