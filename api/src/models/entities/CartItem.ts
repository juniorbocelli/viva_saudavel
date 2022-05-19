import Product from './Product';

class CartItem {
  product: Product | Product['id'];
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';

  constructor(product: CartItem['product'], frequency: CartItem['frequency']) {
    if (typeof (this.product) !== 'undefined')
      throw new Error("Invalid cart item");

    this.product = product;
    this.frequency = frequency;
  };
};

export default CartItem;