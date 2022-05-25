import CartItem from './CartItem';
import Product from './Product';

export class InvoiceValues {
  productsValue: number;
  shippingValue: number;
  discounts: number;
  totalValue: number;

  constructor(productsValue: number, shippingValue: number, discounts: number, totalValue: number) {
    this.productsValue = productsValue;
    this.shippingValue = shippingValue;
    this.discounts = discounts;

    this.totalValue = totalValue;
  };

  public static getNew(productsValue: number, shippingValue: number, discounts: number): InvoiceValues {
    return new InvoiceValues(productsValue, shippingValue, discounts, productsValue + shippingValue - discounts);
  };

  public static getFromCheckoutItems(shippingValue: number, discounts: number, i: Array<CartItem>): InvoiceValues {
    let productsValue: number = 0;

    i.forEach(item => {
      if (item.product instanceof Product)
      productsValue = productsValue + item.product.price;
    });

    return InvoiceValues.getNew(productsValue, shippingValue, discounts);
  };
};

export default InvoiceValues;