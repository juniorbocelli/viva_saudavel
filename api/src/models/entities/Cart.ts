import mongoose from 'mongoose';

import CartItem from './CartItem';
import Client from './Client';

class Cart {
  id: mongoose.Types.ObjectId | string | null;
  clientId: mongoose.Types.ObjectId | string | null;
  client: Client | Client['id'];

  createdAt: Date | null;
  isRegistered: boolean | null;

  items: Array<CartItem> | null;

  constructor(cart: Cart) {
    this.id = cart.id;
    this.clientId = cart.clientId;
    this.client = cart.client;

    this.createdAt = cart.createdAt === null ? new Date() : cart.createdAt;
    this.isRegistered = cart.isRegistered === null ? false : cart.isRegistered;

    this.items = cart.items === null ? [] : cart.items;
  };

  public static fromObject(c: Cart): Cart {
    return new Cart(c);
  };
};

export default Cart;