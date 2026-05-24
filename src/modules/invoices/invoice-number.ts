import { AppDataSource } from "../../data-source";
import { Invoice } from "../../entities/Invoice";

export const generateInvoiceNumber = async(): Promise<string>=>{
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    
    const count = await invoiceRepository.count();
    const year = new Date().getFullYear();
    const number = String(count+1).padStart(4, '0');
    return `INV-${year}-${number}`;
}