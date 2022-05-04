import Product from './Product';

class CartItem {
  productId: Product['id'];
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';

  name?: string;
  price?: number;
  thumb?: string;

  constructor(productId: CartItem['productId'], frequency: CartItem['frequency']) {
    if (typeof (this.productId) !== 'undefined')
      throw new Error("Invalid cart item");

    this.productId = productId;
    this.frequency = frequency;
  };
};

export default CartItem;