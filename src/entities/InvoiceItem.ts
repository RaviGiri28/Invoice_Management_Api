import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Invoice } from './Invoice';
import { Product } from './Product';

@Entity('invoice_items')
export class InvoiceItem{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=> Invoice ,(invoice)=> invoice.items)
    @JoinColumn({name: 'invoiceId'})
    invoice!:Invoice;

    @ManyToOne(()=> Product,(product)=> product.invoiceItems)
    @JoinColumn({name: 'productId'})
    product!: Product;

    @Column({length:100})
    productName!: string;

    @Column({ type: 'decimal', precision:10, scale:2})
    price!: number;

    @Column({type: 'decimal', precision: 5, scale: 2, default:0})
    taxRate!: number;

    @Column({type: 'int'})
    quantity!: number;

    @Column({type: 'decimal', precision: 10,scale: 2, default:0})
    total!: number;
}