import mongoose from 'mongoose';

import ProductFilter from './ProductFilter';
import SanitizerString from '../utils/SanitizerString';

class Product {
  id: mongoose.Types.ObjectId | string | undefined;
  name: string | null;
  producer: string | null;
  measure: string | null;
  description: string | null;
  ingredients: string | null;
  validate: string | null;

  filters: ProductFilter | null;

  price: number | null;
  images: Array<string>;
  thumb:  string | null;

  isActive: boolean | null;;
  quantity: number | null;
  createdAt: Date | null;

  constructor(product?: Product) {
    this.id = SanitizerString.stringOrUndefined(product?.id);
    this.name = SanitizerString.stringOrNull(product?.name);
    this.producer = SanitizerString.stringOrNull(product?.producer);
    this.measure = SanitizerString.stringOrNull(product?.measure);
    this.description = SanitizerString.stringOrNull(product?.description);
    this.ingredients = SanitizerString.stringOrNull(product?.ingredients);
    this.validate = SanitizerString.stringOrNull(product?.validate);

    this.filters = product?.filters || null;

    this.price = product?.price || null;
    this.images = product?.images || [];
    this.thumb = product?.thumb || null;

    this.isActive = product?.isActive || true;
    this.quantity = product?.quantity || null;
    this.createdAt = product?.createdAt || new Date();
  };

  public static fromObject(p: Product): Product {
    return new Product(p)
  };
};

export default Product;