import mongoose from 'mongoose';

import Cart from '../entities/Cart';
import CartItem from '../entities/CartItem';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';

class UCManagerCart {
  private daoCart: DAOCart;
  private daoProduct: DAOProduct;

  constructor(daoCart: DAOCart, daoProduct: DAOProduct) {
    this.daoCart = daoCart;
    this.daoProduct = daoProduct;
  };

  private async getNewOrPrevious(clientId: string): Promise<Cart | null> {
    // Verify if already exist cart
    const carts = await this.daoCart.selectBy({ clientId: clientId });
    const newCart: Cart = {
      id: undefined,
      clientId: clientId,

      createdAt: null,
      isRegistered: null,

      items: null,
    };
    let cart: Cart;

    if (carts.length !== 1)
      cart = new Cart(newCart);
    else {
      cart = carts[0];

      if (!cart.isRegistered && mongoose.isValidObjectId(cart.clientId)) {
        let daoClient = new DAOClient();
        let client = await daoClient.select(cart.clientId as string);

        if (client !== null)
          cart.isRegistered = true;
      };
    };

    return await this.daoCart.saveOrUpdate(cart);
  };

  public async get(clientId: string) {
    const cart = await this.getNewOrPrevious(clientId);

    if (cart === null)
      throw new Error("Erro ao criar carrinho");

    if (cart.items === null)
      cart.items = [];

    // Previne invalid products products in cart
    for (let i = 0; i < cart.items.length; i++) {
      let product = await this.daoProduct.select(cart.items[i].productId as string);

      if (product !== null) {
        if (product.name)
          cart.items[i].name = product.name;

        if (product.price)
          cart.items[i].price = product.price;

        if (product.thumb)
          cart.items[i].thumb = product.thumb;
      } else {
        cart.items.splice(i, 1);
      };
    };

    return this.daoCart.saveOrUpdate(cart);
  };

  public async addItem(cartItem: CartItem, clientId: string): Promise<CartItem> {
    const cart = await this.getNewOrPrevious(clientId);

    if (cart === null)
      throw new Error("Carrinho inválido");

    const product = await this.daoProduct.select(cartItem.productId as string);

    if (product === null)
      throw new Error("Produto inválido");

    if (product.isActive === false)
      throw new Error("Produto inválido");

    if (product.name)
      cartItem.name = product.name;

    if (product.price)
      cartItem.price = product.price;

    if (product.thumb)
      cartItem.thumb = product.thumb;

    cart.items?.push(cartItem);

    this.daoCart.update(cart);

    return cartItem;
  };

  public async removeItem(cartItem: CartItem, clientId: string): Promise<CartItem> {
    const cart = await this.getNewOrPrevious(clientId);

    if (cart === null)
      throw new Error("Carrinho inválido");

    if (cart.items !== null)
      for (let i = 0; i < cart.items.length; i++) {
        if (cartItem.productId === cart.items[i].productId?.toString() && cartItem.frequency === cart.items[i].frequency) {
          cart.items.splice(i, 1);

          break;
        };
      };

    this.daoCart.update(cart);

    return cartItem;
  };

  public async changeClientCode(oldId: string, newId: string): Promise<Cart | null> {
    const cart = await this.getNewOrPrevious(oldId);

    if (cart === null)
      throw new Error("Carrinho inválido");

    cart.clientId = newId;
    cart.isRegistered = true;

    return this.daoCart.update(cart);
  };
};

export default UCManagerCart;