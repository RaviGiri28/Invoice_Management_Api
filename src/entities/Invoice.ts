import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';
import { InvoiceItem } from './InvoiceItem';
import { Payment } from './Payment';

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique : true })
    invoiceNumber!: string;

    @ManyToOne(()=> Customer, (customer)=> customer.invoices)
    @JoinColumn({name : 'customerid'})
    customer!: Customer;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userid' })
    user!: User;

     @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status!: InvoiceStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxAmount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total!: number;

  @Column({ nullable: true, type: 'text' })
  notes!: string;

  @Column({ nullable: true, type: 'date' })
  dueDate!: Date;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items!: InvoiceItem[];

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments!: Payment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}