import mongoose from 'mongoose';

import SanitizerString from '../utils/SanitizerString';
import CartItem from './CartItem';
import Product from './Product';

class InvoiceProductData {
  id: string | null;

  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;

  thumb: string;

  price: number;

  constructor(id: Product['id'] | mongoose.Types.ObjectId, name: Product['name'], producer: Product['producer'], measure: Product['measure'], description: Product['description'], ingredients: Product['ingredients'], validate: Product['validate'], thumb: Product['thumb'], price: Product['price']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);

    this.name = SanitizerString.removeSpaces(name);
    this.producer = SanitizerString.removeSpaces(producer);
    this.measure = SanitizerString.removeSpaces(measure);
    this.description = SanitizerString.removeSpaces(description);
    this.ingredients = SanitizerString.removeSpaces(ingredients);
    this.validate = SanitizerString.removeSpaces(validate);

    this.thumb = SanitizerString.stringOrEmpty(thumb);

    this.price = price;
  };

  public static getFromProduct(p: Product): InvoiceProductData {
    return new InvoiceProductData(p.id, p.name, p.producer, p.measure, p.description, p.ingredients, p.validate, p.thumb, p.price);
  };

  public static getFromCartItem(i: CartItem): InvoiceProductData {
    const p = i.product as Product;

    return new InvoiceProductData(p.id, p.name, p.producer, p.measure, p.description, p.ingredients, p.validate, p.thumb, p.price);
  };

  public static getListFromProductsList(l: Array<Product>): Array<InvoiceProductData> {
    let items: Array<InvoiceProductData> = [];

    l.forEach(product => {
      items.push(InvoiceProductData.getFromProduct(product));
    });

    return items;
  };

  public static getListFromCartItemList(l: Array<CartItem>): Array<InvoiceProductData> {
    let items: Array<InvoiceProductData> = [];

    l.forEach(cartItem => {
      items.push(InvoiceProductData.getFromCartItem(cartItem));
    });

    return items;
  };
};

export default InvoiceProductData;