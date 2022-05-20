import mongoose from 'mongoose';

import CartItem from './CartItem';
import Client from './Client';
import SanitizerString from '../utils/SanitizerString';

class Cart {
  id: string | null;
  clientId: mongoose.Types.ObjectId | string | null;
  client: Client | Client['id'];

  createdAt: Date;
  isRegistered: boolean;

  items: Array<CartItem>;

  constructor(id: Cart['id'] | mongoose.Types.ObjectId, clientId: Cart['clientId'], client: Cart['client'], isRegistered: Cart['isRegistered'], items: Cart['items'], createdAt: Cart['createdAt']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);

    this.clientId = clientId;
    this.client = client;
    this.isRegistered = isRegistered;

    this.items = items;

    this.createdAt = createdAt;
  };

  public static getNew(clientId: Cart['clientId'], client: Cart['client'], isRegistered: Cart['isRegistered'], items: Cart['items']): Cart {
    return new Cart(null, clientId, client, isRegistered, items, new Date());
  };

  public static getUpdated(o: Object, previousCart: Cart): Cart {
    let cart = o as Cart;

    const updatedCart: Cart = {
      // Imutable fields
      id: previousCart.id,
      createdAt: previousCart.createdAt,

      clientId: cart['clientId'] || previousCart.clientId,
      client: cart['client'] || previousCart.client,
      isRegistered: cart['isRegistered'] || previousCart.isRegistered,

      items: cart['items'] || previousCart.items,
    };

    return updatedCart;
  };

  public static getFromObject(c: Cart): Cart {
    return new Cart(c.id, c.clientId, c.client, c.isRegistered, c.items, c.createdAt);
  };
};

export default Cart;