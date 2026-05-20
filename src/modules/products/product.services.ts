import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/Product";

const productRepository = AppDataSource.getTreeRepository(Product);

export const createProductService = async (name: string, description: string, price: number, taxRate: number) => {
    const existingProduct = await productRepository.findOne({
        where: { name }
    });
    if (existingProduct) {
        throw new Error('Product with this name already exists!');
    }
    const product = productRepository.create({
        name,
        description,
        price,
        taxRate: taxRate || 0,
    });
    await productRepository.save(product);
    return product;
};

export const getAllProductsServices = async () => {
    return await productRepository.find({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
    });
};

export const getProductByIdServices = async (id: number) => {
    const product = await productRepository.findOne({
        where: { id, isActive: true },
    });
    if (!product) {
        throw new Error('Product not found!');
    }
    return product;
};

export const updateProductServices = async (
    id: number,
    name: string,
    description: string,
    price: number,
    taxRate: number
) => {
    const product = await productRepository.findOne({
        where: { id }
    });
    if (!product) {
        throw new Error('Product not found!');
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (taxRate !== undefined) product.taxRate = taxRate;

    await productRepository.save(product);
    return product;
};

export const deleteProductService = async (id: number) => {
    const product = await productRepository.findOne({
        where: { id }
    });
    if (!product) {
        throw new Error('Product not found!');
    }
    product.isActive = false;
    await productRepository.save(product);
    return { message: 'Product deleted successfully!' };

}