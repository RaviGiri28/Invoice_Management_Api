export const calculateInvoiceTotals = (
  items: {
    productId: number;
    quantity: number;
    unitPrice: number;
    taxRate: number;
  }[],
  discount: number = 0
) => {
  let subtotal = 0;
  let totalTaxAmount = 0;

  const calculatedItems = items.map((item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    const itemTaxAmount = (itemSubtotal * item.taxRate) / 100;
    const itemTotal = itemSubtotal + itemTaxAmount;

    subtotal += itemSubtotal;
    totalTaxAmount += itemTaxAmount;

    return {
      productId: item.productId, // 👈 add this
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxRate: item.taxRate,
      taxAmount: parseFloat(itemTaxAmount.toFixed(2)),
      total: parseFloat(itemTotal.toFixed(2)),
    };
  });

  const total = subtotal + totalTaxAmount - discount;

  return {
    calculatedItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    taxAmount: parseFloat(totalTaxAmount.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};