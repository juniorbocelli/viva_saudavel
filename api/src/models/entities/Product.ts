import mongoose from 'mongoose';

import ProductFilter from './ProductFilter';
import SanitizerString from '../utils/SanitizerString';

class Product {
  id: string | null;
  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;

  filters: ProductFilter;

  price: number;
  images: Array<string>;
  thumb:  string | null;

  isActive: boolean;
  quantity: number | null;
  createdAt: Date;

  constructor(id: Product['id'] | mongoose.Types.ObjectId, name: Product['name'], producer: Product['producer'], measure: Product['measure'], description: Product['description'], ingredients: Product['ingredients'], validate: Product['validate'], filters: Product['filters'], price: Product['price'], images: Product['images'], thumb: Product['thumb'], quantity: Product['quantity'], isActive: Product['isActive'], createdAt: Product['createdAt']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);
    this.name = SanitizerString.removeSpaces(name);
    this.producer = SanitizerString.removeSpaces(producer);
    this.measure = SanitizerString.removeSpaces(measure);
    this.description = SanitizerString.removeSpaces(description);
    this.ingredients = SanitizerString.removeSpaces(ingredients);
    this.validate = SanitizerString.removeSpaces(validate);

    this.filters = filters;

    this.price = price;
    this.images = images;
    this.thumb = thumb;

    this.quantity = quantity;
    
    this.isActive = isActive;
    this.createdAt = createdAt;
  };

  public static getNew(name: Product['name'], producer: Product['producer'], measure: Product['measure'], description: Product['description'], ingredients: Product['ingredients'], validate: Product['validate'], filters: Product['filters'], price: Product['price'], images: Product['images'], thumb: Product['thumb'], quantity: Product['quantity']): Product {
    return new Product(null, name, producer, measure, description, ingredients, validate, filters, price, images, thumb, quantity, true, new Date());
  };

  public static getUpdated(o: Object, previousProduct: Product): Product {
    let product = o as Product;

    const updatedProduct: Product = {
      // Imutable fields
      id: previousProduct.id,
      createdAt: previousProduct.createdAt,

      name: product['name'] ? SanitizerString.removeSpaces(product['name']) : previousProduct.name,
      producer: product['producer'] ? SanitizerString.removeSpaces(product['producer']) : previousProduct.producer,
      measure: product['measure'] ? SanitizerString.removeSpaces(product['measure']) : previousProduct.measure,
      description: product['description'] ? SanitizerString.removeSpaces(product['description']) : previousProduct.description,
      ingredients: product['ingredients'] ? SanitizerString.removeSpaces(product['ingredients']) : previousProduct.ingredients,
      validate: product['validate'] ? SanitizerString.removeSpaces(product['validate']) : previousProduct.validate,

      filters: product['filters'] || previousProduct.filters,
      price: product['price'] || previousProduct.price,
      images: product['images'] || previousProduct.images,
      thumb: product['thumb'] || previousProduct.thumb,
      quantity: product['quantity'] || previousProduct.quantity,

      isActive: product['isActive'] || previousProduct.isActive,
    };

    return updatedProduct;
  };

  public static getFromObject(p: Product): Product {
    return new Product(p.id, p.name, p.producer, p.measure, p.description, p.ingredients, p.validate, p.filters, p.price, p.images, p.thumb, p.quantity, p.isActive, p.createdAt);
  };
};

export default Product;