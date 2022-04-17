import mongoose from 'mongoose';

import DAO from '../../utils/DAO';
import ProductSchema from '../schemas/ProductSchema';
import Product from '../../../models/entities/Product';

class DAOProduct implements DAO<Product, string> {
  isValidObjectId(product: Product | string): boolean {

    if (product instanceof Product)
      if (typeof (product.id) !== "undefined")
        return mongoose.Types.ObjectId.isValid(product.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(product);
  };

  async save(product: Product) {
    let productSchema: Product & mongoose.Document<any, any, Product>;

    productSchema = new ProductSchema({
      name: product.name,
      producer: product.producer,
      measure: product.measure,
      description: product.description,
      ingredients: product.ingredients,
      validate: product.validate,

      filters: product.filters,

      price: product.price,
      images: product.images,
      thumb: product.thumb,

      isActive: product.isActive,
      quantity: product.quantity,
      createdAt: product.createdAt,
    });
    await productSchema.save();

    product.id = productSchema._id;

    return productSchema;
  };

  async update(product: Product) {
    if (!this.isValidObjectId(product))
      throw 'O id do produto é inválido';

    const foundedProduct = await ProductSchema.findById(product.id);

    if (foundedProduct === null)
      throw 'Produto inválido'

    const updatedProductData = {
      name: product.name || foundedProduct.name,
      producer: product.producer || foundedProduct.producer,
      measure: product.measure || foundedProduct.measure,
      description: product.description || foundedProduct.description,
      ingredients: product.ingredients || foundedProduct.ingredients,
      validate: product.validate || foundedProduct.validate,

      filters: product.filters || foundedProduct.filters,

      price: product.price || foundedProduct.price,
      images: product.images || foundedProduct.images,
      thumb: product.thumb || foundedProduct.thumb,

      isActive: product.isActive || foundedProduct.isActive,
      quantity: product.quantity || foundedProduct.quantity,
      createdAt: product.createdAt || foundedProduct.createdAt,
    };

    return await ProductSchema.findByIdAndUpdate(product.id, updatedProductData, { new: true });
  };

  async saveOrUpdate(product: Product) {
    if (typeof (product.id) === "undefined") {
      return this.save(product);
    };

    if (!this.isValidObjectId(product))
      throw `O id do produto é inválido`;

    const singleProduct = await ProductSchema.findById(product.id);

    if (singleProduct === null)
      return this.save(product);
    else
      return this.update(product);
  };

  async saveOrUpdateWithReturnId(product: Product): Promise<string> {
    await this.saveOrUpdate(product);

    return product.id!?.toString();
  };

  async delete(id: string) {
    if (!this.isValidObjectId(id))
      throw `O id do produto é inválido`;

    await ProductSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Product | null> {
    const product = await ProductSchema.findById(id);

    if (product === null)
      return null;

    const foundedProduct: Product = {
      id: product._id,
      name: product.name,
      producer: product.producer,
      measure: product.measure,
      description: product.description,
      ingredients: product.ingredients,
      validate: product.validate,

      filters: product.filters,

      price: product.price,
      images: product.images,
      thumb: product.thumb,

      isActive: product.isActive,
      quantity: product.quantity,
      createdAt: product.createdAt,
    };

    return new Product(foundedProduct);
  };

  async selectAll(): Promise<Array<Product>> {
    const products = await ProductSchema.find();
    let productsToReturn: Array<Product> = [];

    products.forEach((product) => {
      let foundedProduct: Product = {
        id: product._id,
        name: product.name,
        producer: product.producer,
        measure: product.measure,
        description: product.description,
        ingredients: product.ingredients,
        validate: product.validate,

        filters: product.filters,

        price: product.price,
        images: product.images,
        thumb: product.thumb,

        isActive: product.isActive,
        quantity: product.quantity,
        createdAt: product.createdAt,
      };
      productsToReturn.push(new Product(foundedProduct));
    });
    return productsToReturn;
  };

  async selectBy(query: Object): Promise<Array<Product>> {
    const products = await ProductSchema.find(query).exec();
    let productsToReturn: Array<Product> = [];

    products.forEach((product) => {
      let foundedProduct: Product = {
        id: product._id,
        name: product.name,
        producer: product.producer,
        measure: product.measure,
        description: product.description,
        ingredients: product.ingredients,
        validate: product.validate,

        filters: product.filters,

        price: product.price,
        images: product.images,
        thumb: product.thumb,

        isActive: product.isActive,
        quantity: product.quantity,
        createdAt: product.createdAt,
      };
      productsToReturn.push(new Product(foundedProduct));
    });
    return productsToReturn;
  };
};

export default DAOProduct;