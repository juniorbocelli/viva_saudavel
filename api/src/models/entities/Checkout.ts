import mongoose from 'mongoose';

import CartItem from './CartItem';
import Client from './Client';
import { WeekDaysName } from '../utils/Dates';
import SanitizerString from '../utils/SanitizerString';
import Product from './Product';

class Checkout {
  id: string | null;

  client: Client | string;
  items: Array<CartItem>;

  deliveryDay: WeekDaysName;

  createdAt: Date;
  isActive: Boolean;

  constructor(id: Checkout['id'] | mongoose.Types.ObjectId, client: Checkout['client'], items: Checkout['items'], deliveryDay: Checkout['deliveryDay'], createdAt: Checkout['createdAt'], isActive: Checkout['isActive']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);

    this.client = client;
    this.items = items;

    this.deliveryDay = deliveryDay;

    this.createdAt = createdAt;
    this.isActive = isActive;
  };

  public static getNew(client: Checkout['client'], items: Checkout['items'], deliveryDay: Checkout['deliveryDay']): Checkout {
    return new Checkout(null, client, items, deliveryDay, new Date(), true);
  };

  public static getUpdated(o: Object, previousCheckout: Checkout): Checkout {
    let checkout = o as Checkout;

    const updatedCheckout = {
      // Imutable fields
      id: previousCheckout.id,
      createdAt: previousCheckout.createdAt,
      client: previousCheckout.client,

      items: checkout['items'] || previousCheckout.items,

      deliveryDay: checkout['deliveryDay'] || previousCheckout.deliveryDay,

      isActive: typeof(checkout['isActive']) !== 'undefined' ? checkout['isActive'] : previousCheckout.isActive,
    };

    return Checkout.getFromObject(updatedCheckout as Checkout);
  };

  public static getFromObject(c: Checkout): Checkout {
    return new Checkout(c.id, c.client, c.items, c.deliveryDay, c.createdAt, c.isActive);
  };

  public getProductsByFrequency(f: CartItem['frequency']): Array<Product> {
    let products: Array<Product> = [];

    this.items.forEach(item => {
      if (item.frequency === f)
        if (item.product instanceof Product)
          products.push(item.product);
        else
          throw new Error("Existem produtos não populados");
    });

    return products;
  };
};

export default Checkout;