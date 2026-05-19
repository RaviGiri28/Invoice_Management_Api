import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Invoice } from './Invoice';

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length:100})
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column({ nullable: true})
    phone!: string;

    @Column({nullable: true})
    address!: string;

    @OneToMany(()=> Invoice, (invoice)=> invoice.customer)
    invoices!: Invoice[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}