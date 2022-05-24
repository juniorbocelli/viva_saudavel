import CartItem from './CartItem';
import Client from './Client';
import { WeekDaysName } from '../utils/Dates';

class Checkout {
  id: string | null;

  client: Client | string;
  items: Array<CartItem | string>;

  deliveryDay: WeekDaysName;

  createdAt: Date;
  isActive: Boolean;

  constructor(id: Checkout['id'], client: Checkout['client'], items: Checkout['items'], deliveryDay: Checkout['deliveryDay'], createdAt: Checkout['createdAt'], isActive: Checkout['isActive']) {
    this.id = id;

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

    const updatedCheckout: Checkout = {
      // Imutable fields
      id: previousCheckout.id,
      createdAt: previousCheckout.createdAt,
      client: previousCheckout.client,

      items: checkout['items'] || previousCheckout.items,

      deliveryDay: checkout['deliveryDay'] || previousCheckout.deliveryDay,

      isActive: checkout['isActive'] || previousCheckout.isActive,
    };

    return updatedCheckout;
  };

  public static getFromObject(c: Checkout): Checkout {
    return new Checkout(c.id, c.client, c.items, c.deliveryDay, c.createdAt, c.isActive);
  };
};

export default Checkout;