import mongoose from 'mongoose';

import SanitizerString from '../utils/SanitizerString';
import Product from './Product';

class InvoiceProductData {
  id: string | null;

  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;

  price: number;

  constructor(id: Product['id'] | mongoose.Types.ObjectId, name: Product['name'], producer: Product['producer'], measure: Product['measure'], description: Product['description'], ingredients: Product['ingredients'], validate: Product['validate'], price: Product['price']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);

    this.name = SanitizerString.removeSpaces(name);
    this.producer = SanitizerString.removeSpaces(producer);
    this.measure = SanitizerString.removeSpaces(measure);
    this.description = SanitizerString.removeSpaces(description);
    this.ingredients = SanitizerString.removeSpaces(ingredients);
    this.validate = SanitizerString.removeSpaces(validate);

    this.price = price;
  };

  public static getFromProduct(p: Product): InvoiceProductData {
    return new InvoiceProductData(p.id, p.name, p.producer, p.measure, p.description, p.ingredients, p.validate, p.price);
  };

  public static getListFromListProducts(l: Array<Product>): Array<InvoiceProductData> {
    let items: Array<InvoiceProductData> = [];

    l.forEach(product => {
      items.push(InvoiceProductData.getFromProduct(product));
    });

    return items;
  };
};

export default InvoiceProductData;