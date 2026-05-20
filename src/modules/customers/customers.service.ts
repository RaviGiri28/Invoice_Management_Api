import { AppDataSource } from "../../data-source";
import { Customer } from "../../entities/Customer";

const customerRepository = AppDataSource.getRepository(Customer);

export const createCustomerService = async (name: string, email : string, phone: string, address: string)=>{
    const existingCustomer= await customerRepository.findOne({
        where: {email}
    });

    if (existingCustomer) {
        throw new Error('Customer with this email already exists!');
    }

      const customer = customerRepository.create({ name, email, phone, address });
  await customerRepository.save(customer);
  return customer;
};

export const getAllCustomersService = async()=>{
    return await customerRepository.find({
        order: {createdAt: 'DESC'}
    });
};

export const getCustomerByIdService  = async(id: number)=>{
    const customer = await customerRepository.findOne({
        where: {id}
    });
    if (!customer) {
        throw new Error('Customer not found!');
    }
    return customer;
};

export const updateCustomerService = async(id: number, name: string, email: string, phone: string, address: string)=>{
    const customer = await customerRepository.findOne({
        where: {id}
    });
    if (!customer) {
        throw new Error('Customer not found!');
    };
    if (name) customer.name= name;
    if (email) customer.email= email;
    if (phone) customer.phone = phone;
    if (address) customer.address = address;

    await customerRepository.save(customer);
    return customer;
};

export const deleteCustomerService = async (id: number) => {

    const customer = await customerRepository.findOne({
        where: {id}
    });
    if (!customer) {
        throw new Error('Customer not found!');
    }

    await customerRepository.remove(customer);
    return {message: 'Customer deleted Successfully'};
}