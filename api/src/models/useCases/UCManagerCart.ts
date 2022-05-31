import mongoose from 'mongoose';

import Cart from '../entities/Cart';
import CartItem from '../entities/CartItem';
import Product from '../entities/Product';

import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';

import UCManagerClient from './UCManagerClient';

class UCManagerCart {
  private daoCart: DAOCart;
  private daoProduct: DAOProduct;

  private ucManagerClientPersistence: UCManagerClient;

  constructor(daoCart: DAOCart, daoProduct: DAOProduct, daoClient: DAOClient) {
    this.daoCart = daoCart;
    this.daoProduct = daoProduct;

    this.ucManagerClientPersistence = new UCManagerClient(daoClient);
  };

  private async populateCart(cart: Cart) {
    let avaliableItems: Array<CartItem> = [];

    for (let item of cart.items) {
      let product: Product | null;

      if (item.product instanceof Product)
        product = await this.daoProduct.select(item.product.id as string);
      else
        product = await this.daoProduct.select(item.product as string);

      if (product && product.isActive && product.quantity !== 0)
        avaliableItems.push({ frequency: item.frequency, product: product });
    };

    if (avaliableItems.length !== cart.items.length) {
      cart.items = avaliableItems;
      await this.daoCart.update(cart);
    };

    cart.items = avaliableItems;

    return cart;
  };

  private async getNewOrPrevious(clientId: string): Promise<Cart | null> {
    // Verify if already exist cart
    const carts = await this.daoCart.selectBy({ clientId: clientId });
    let cart: Cart;

    if (carts.length === 0)
      cart = Cart.getNew(clientId, null, false, []);
    else
      cart = carts[0];

    if (!cart.isRegistered && mongoose.isValidObjectId(clientId)) {
      let client = await this.ucManagerClientPersistence.getById(clientId);

      if (client !== null) {
        cart.isRegistered = true;
        cart.client = client.id;
      };
    };

    return await this.daoCart.saveOrUpdate(cart);
  };

  public async get(clientId: string) {
    const cart = await this.getNewOrPrevious(clientId);

    if (cart === null)
      throw new Error("Erro ao criar carrinho");

    return await this.populateCart(cart);
  };

  public async addItem(cartItem: CartItem, clientId: string): Promise<CartItem> {
    let cart = await this.getNewOrPrevious(clientId);
    let product: Product | null;

    if (cart === null)
      throw new Error("Carrinho inválido");

    if (cartItem.product instanceof Product) {
      product = await this.daoProduct.select(cartItem.product.id as string);
    } else {
      product = await this.daoProduct.select(cartItem.product as string);
    };

    if (product === null)
      throw new Error("Produto inválido");

    cartItem.product = product;

    if (product.isActive && product.quantity! > 0) {
      let newItem = new CartItem(product.id as string, cartItem.frequency);

      cart.items.push(newItem);

      await this.daoCart.update(cart);
    };

    return cartItem;
  };

  public async removeItem(cartItem: CartItem, clientId: string): Promise<CartItem> {
    const cart = await this.getNewOrPrevious(clientId);

    if (cart === null)
      throw new Error("Carrinho inválido");

    let idToRemove: string | null = cartItem.product instanceof Product ? cartItem.product.id : cartItem.product;

    cart.items.forEach(item => {
      if (item.product instanceof Product) {
        if (item.product.id === idToRemove)
          cart.items.splice(cart.items.indexOf(item), 1);
      } else {
        if (item.product === idToRemove)
          cart.items.splice(cart.items.indexOf(item), 1);
      };
    });

    this.daoCart.update(cart);

    return cartItem;
  };

  public async changeClientCode(oldId: string, newId: string): Promise<Cart | null> {
    const notLoggedCart = await this.getNewOrPrevious(oldId);

    // Verify if logged client already have a cart
    const loggedCart = await this.daoCart.selectBy({ clientId: newId });

    let ourCart: Cart;

    if (notLoggedCart === null)
      throw new Error("Carrinho inválido");

    if (loggedCart.length !== 0) {
      ourCart = loggedCart[0];

      // Concat product items
      ourCart.items.concat(notLoggedCart.items || []);

      // Remove not logged cart
      this.daoCart.delete(notLoggedCart.id as string);
    } else {
      // Update not logged cart data
      ourCart = notLoggedCart;

      ourCart.clientId = newId;
      ourCart.client = newId;

      ourCart.isRegistered = true;
    };

    return this.daoCart.update(ourCart);
  };

  public async emptyCart(id: string) {
    const cart = await this.daoCart.select(id);

    if (cart === null)
      throw new Error("Carrinho inválido");

    cart.items = [];

    return this.daoCart.update(cart);
  };

  public async emptyCartByClientId(clientId: string) {
    const carts = await this.daoCart.selectBy({ clientId: clientId });

    if (carts.length === 0)
      throw new Error("Carrinho inválido");

    carts[0].items = [];

    return this.daoCart.update(carts[0]);
  };
};

export default UCManagerCart;