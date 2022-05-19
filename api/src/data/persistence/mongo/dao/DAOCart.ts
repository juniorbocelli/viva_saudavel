import mongoose from 'mongoose';

import DAO from '../../../utils/DAO';
import CartSchema from '../../schemas/CartSchema';
import Cart from '../../../../models/entities/Cart';

class DAOCart implements DAO<Cart, string> {
  isValidObjectId(cart: Cart | string): boolean {

    if (cart instanceof Cart)
      if (cart.id !== null)
        return mongoose.Types.ObjectId.isValid(cart.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(cart);
  };

  async save(cart: Cart) {
    let cartSchema: Cart & mongoose.Document<any, any, Cart>;

    cartSchema = new CartSchema({
      client: cart.client,

      createdAt: cart.createdAt,
      isRegistered: cart.isRegistered,

      items: cart.items,
    });
    await cartSchema.save();

    cart.id = cartSchema._id;

    return cartSchema;
  };

  async update(cart: Cart) {
    if (!this.isValidObjectId(cart))
      throw 'O id do carrinho é inválido';

    const foundedCart = await CartSchema.findById(cart.id);

    if (foundedCart === null)
      throw 'Carrinho inválido'

    const updatedCartData = {
      clientId: cart.client,
      client: cart.clientId || foundedCart.clientId,

      createdAt: foundedCart.createdAt,
      isRegistered: cart.isRegistered !== null ? cart.isRegistered : cart.isRegistered,

      items: cart.items || foundedCart.items,
    };

    return await CartSchema.findByIdAndUpdate(cart.id, updatedCartData, { new: true });
  };

  async saveOrUpdate(cart: Cart) {
    if (typeof (cart.id) === "undefined") {
      return this.save(cart);
    };

    if (!this.isValidObjectId(cart))
      throw `O id do carrinho é inválido`;

    const singleCart = await CartSchema.findById(cart.id);

    if (singleCart === null)
      return this.save(cart);
    else
      return this.update(cart);
  };

  async saveOrUpdateWithReturnId(cart: Cart): Promise<string> {
    await this.saveOrUpdate(cart);

    return cart.id!?.toString();
  };

  async delete(id: string) {
    if (!this.isValidObjectId(id))
      throw `O id do carrinho é inválido`;

    await CartSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Cart | null> {
    const cart = await CartSchema.findById(id);

    if (cart === null)
      return null;

    const foundedCart: Cart = {
      id: cart.id,
      clientId: cart.clientId,
      client: cart.client,

      createdAt: cart.createdAt,
      isRegistered: cart.isRegistered,

      items: cart.items,
    };

    return Cart.fromObject(foundedCart);
  };

  async selectAll(): Promise<Array<Cart>> {
    const carts = await CartSchema.find();
    let cartsToReturn: Array<Cart> = [];

    carts.forEach((cart) => {
      let foundedCart: Cart = {
        id: cart.id,
        clientId: cart.clientId,
        client: cart.client,

        createdAt: cart.createdAt,
        isRegistered: cart.isRegistered,

        items: cart.items,
      };
      cartsToReturn.push(Cart.fromObject(foundedCart));
    });
    return cartsToReturn;
  };

  async selectBy(query: Object): Promise<Array<Cart>> {
    const carts = await CartSchema.find(query).exec();
    let cartsToReturn: Array<Cart> = [];

    carts.forEach((cart) => {
      let foundedCart: Cart = {
        id: cart.id,
        clientId: cart.clientId,
        client: cart.client,

        createdAt: cart.createdAt,
        isRegistered: cart.isRegistered,

        items: cart.items,
      };
      cartsToReturn.push(Cart.fromObject(foundedCart));
    });
    return cartsToReturn;
  };

  async populate(cart: Cart, fields: Array<string>): Promise<Cart> {
    const foundedCart = await CartSchema.findById(cart.id);

    if (foundedCart === null)
      throw 'Carrinho inválido'

    fields.forEach(field => {
      foundedCart.populate(field);
    });

    return Cart.fromObject(foundedCart);
  };

  async selectAndPopulate(query: Object, fields: Array<string>): Promise<Array<Cart>> {
    const carts = await CartSchema.find(query).exec();

    let populatedCarts = carts.map(cart => {
      fields.forEach(field => {
        cart.populate(field);
      });

      return cart;
    });

    return populatedCarts;
  };
};

export default DAOCart;