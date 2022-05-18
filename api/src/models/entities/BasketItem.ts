import Product from './Product';
import CartItem from './CartItem';

class BasketItem {
  productId: Product['id'];

  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  quantity: number;

  constructor(productId: Product['id'], frequency: BasketItem['frequency'], quantity: BasketItem['quantity']) {
    this.productId = productId;

    this.frequency = frequency;
    this.quantity = quantity;
  };

  public add(q: number = 1): void {
    this.quantity = this.quantity + q;
  };

  public isSameItem(i: CartItem): boolean {
    return this.productId === i.productId && this.frequency === i.frequency;
  };

  public static createFromCartItem(i: CartItem): BasketItem {
    return new BasketItem(i.productId, i.frequency, 1);
  };
};

export default BasketItem;