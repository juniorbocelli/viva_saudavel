import mongoose from 'mongoose';

import CartItem from './CartItem';

class Cart {
  id: mongoose.Types.ObjectId | string | undefined;
  clientId: mongoose.Types.ObjectId | string | null;

  createdAt: Date | null;
  isRegistered: boolean | null;

  itens: Array<CartItem> | null;

  constructor(cart: Cart) {
    this.id = cart.id;
    this.clientId = cart.clientId;

    this.createdAt = cart.createdAt === null ? new Date() : cart.createdAt;
    this.isRegistered = cart.isRegistered === null ? false : cart.isRegistered;

    this.itens = cart.itens === null ? [] : cart.itens;
  };
};

export default Cart;