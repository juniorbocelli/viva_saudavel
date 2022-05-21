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
      clientId: cart.clientId,
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

    const updatedCartData = {
      clientId: cart.clientId,
      client: cart.client,

      createdAt: cart.createdAt,
      isRegistered: cart.isRegistered,

      items: cart.items,
    };

    const updateCart = await CartSchema.findByIdAndUpdate(cart.id, updatedCartData, { new: true });

    if (updateCart !== null)
      return Cart.getFromObject(updateCart);

    return null;
  };

  async saveOrUpdate(cart: Cart) {
    if (cart.id === null) {
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

    return Cart.getFromObject(foundedCart);
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
      cartsToReturn.push(Cart.getFromObject(foundedCart));
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
      cartsToReturn.push(Cart.getFromObject(foundedCart));
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

    return Cart.getFromObject(foundedCart);
  };

  async selectAndPopulate(query: Object, fields: Array<string>): Promise<Array<Cart>> {
    const carts = await CartSchema.find(query).exec();

    let populatedCarts = carts.map(cart => {

        cart.populate(fields);


      return cart;
    });

    return populatedCarts;
  };
};

export default DAOCart;