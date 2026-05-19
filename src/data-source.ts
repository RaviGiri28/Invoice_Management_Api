import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ENV } from './config/env';
import { User } from './entities/User';
import { Customer } from './entities/Customer';
import { Product } from './entities/Product';
import { Invoice } from './entities/Invoice';
import { InvoiceItem } from './entities/InvoiceItem';
import { Payment } from './entities/Payment';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host:ENV.DB_HOST,
    port:ENV.DB_PORT,
    username:ENV.DB_USER,
    password:ENV.DB_PASS,
    database:ENV.DB_NAME,
    synchronize:false,
    logging:true,
  entities: [User, Customer, Product, Invoice, InvoiceItem, Payment],
  migrations: [__dirname + '/migrations/**/*.ts'],
})