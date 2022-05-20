import mongoose from 'mongoose';

import Cart from '../entities/Cart';
import CartItem from '../entities/CartItem';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';
import Product from '../entities/Product';

class UCManagerCart {
  private daoCart: DAOCart;
  private daoProduct: DAOProduct;

  constructor(daoCart: DAOCart, daoProduct: DAOProduct) {
    this.daoCart = daoCart;
    this.daoProduct = daoProduct;
  };

  private async getNewOrPrevious(clientId: string): Promise<Cart | null> {
    // Verify if already exist cart
    const carts = await this.daoCart.selectAndPopulate({ clientId: clientId }, ['product']);
    const newCart: Cart = {
      id: null,
      clientId: clientId,
      client: null,

      createdAt: null,
      isRegistered: null,

      items: null,
    };
    let cart: Cart;

    if (carts.length === 0)
      cart = new Cart(newCart);
    else {
      cart = carts[0];

      if (!cart.isRegistered && mongoose.isValidObjectId(cart.clientId)) {
        let daoClient = new DAOClient();
        let client = await daoClient.select(cart.clientId as string);

        if (client !== null) {
          cart.isRegistered = true;
          cart.client = client;
        };
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
    let cartItems = cart.items;
    cartItems.forEach(item => {
      if (item.product instanceof Product)
        if (!item.product.isActive || item.product.quantity === 0)
          cartItems.splice(cartItems.indexOf(item), 1);
    });

    return this.daoCart.saveOrUpdate(cart);
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
      cart = await this.daoCart.populate(cart, ['product']);
      let newItem = new CartItem(product, cartItem.frequency);

      cart.items?.push(newItem);

      this.daoCart.update(cart);
    };

    return cartItem;
  };

  public async removeItem(cartItem: CartItem, clientId: string): Promise<CartItem> {
    const cart = await this.getNewOrPrevious(clientId);
    let product: Product | null;

    if (cart === null)
      throw new Error("Carrinho inválido");

    // TODO: Retirar
    if (cartItem.product instanceof Product)
      product = await this.daoProduct.select(cartItem.product.id as string);
    else
      product = await this.daoProduct.select(cartItem.product);

    if (product === null)
      throw new Error("Produto inválido");

    let items = cart.items || [];

    for (let item of items) {
      let product: Product = item.product as Product;
      if (product.id === (cartItem.product as Product).id && item.frequency === cartItem.frequency) {
        items.splice(items.indexOf(item), 1);

        break;
      };
    };

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

    if (loggedCart.length > 0) {
      ourCart = loggedCart[0];

      // Concat product items
      ourCart.items?.concat(notLoggedCart.items || []);

      // Remove not logged cart
      this.daoCart.delete(notLoggedCart.id as string);
    } else {
      // Update not logged cart data
      ourCart = notLoggedCart;

      ourCart.clientId = newId;
      ourCart.isRegistered = true;
    };

    return this.daoCart.update(ourCart);
  };
};

export default UCManagerCart;