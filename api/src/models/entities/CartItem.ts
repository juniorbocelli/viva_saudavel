import Product from './Product';

class CartItem {
  product: Product | string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';

  constructor(product: CartItem['product'], frequency: CartItem['frequency']) {
    this.product = product;
    this.frequency = frequency;
  };
};

export default CartItem;