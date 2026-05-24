import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Invoice } from './Invoice';

export enum paymentMethod {
    CASH = 'cash',
    BANK_TRANSFER = 'bank_transfer',
    CREDIT_CARD = 'credit_card', 
    UPT= 'upi',
}

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=> Invoice, (invoice)=> invoice.payments)
    @JoinColumn({name: 'invoiceId' })
    invoice!: Invoice;

    @Column({type: 'decimal', precision: 10, scale: 2})
    amount!: number;

    @Column({ type: 'enum', enum: paymentMethod})
    paymentMethod!: paymentMethod;

    @Column({nullable: true})
    transactionId!: string;

    @Column({nullable: true, type: 'text'})
    notes!: string;

    @CreateDateColumn()
    paidAt!: Date;
}