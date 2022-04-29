import Cart from '../entities/Cart';
import CartItem from '../entities/CartItem';
import DAOCart from '../../persistence/mongo/dao/DAOCart';
import DAOProduct from '../../persistence/mongo/dao/DAOProduct';

class UCManagerCart {
  daoCart: DAOCart;
  daoProduct: DAOProduct;

  constructor(daoCart: DAOCart, daoProduct: DAOProduct) {
    this.daoCart = daoCart;
    this.daoProduct = daoProduct;
  };

  public async get(clientId: string) {
    // Verify if already exist cart
    const carts = await this.daoCart.selectBy({ clientId: clientId });
    const newCart: Cart = {
      id: undefined,
      clientId: clientId,

      createdAt: null,
      isRegistered: null,

      itens: null,
    };
    let cart: Cart;

    if (carts.length !== 1)
      cart = new Cart(newCart);
    else
      cart = carts[0];

    let itens: Array<CartItem> = []

    // Previne invalid products products in cart
    cart.itens?.forEach(async (item) => {
      let product = await this.daoProduct.select(item.productId as string);

      if (product !== null) {
        if (product.name)
          item.name = product.name;

        if (product.price)
          item.price = product.price;

        if (product.isActive)
          itens.push(item);
      };
    });

    cart.itens = itens;

    return await this.daoCart.saveOrUpdate(cart);
  };

  public async addProduct(cartItem: CartItem, clientId: string) {
    const cart = await this.get(clientId);

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

    cart.itens?.push(cartItem);

    return await this.daoCart.update(cart);
  };

  public async removeProduct(cartItem: CartItem, clientId: string) {
    const cart = await this.get(clientId);

    if (cart === null)
      throw new Error("Carrinho inválido");

    if (cart?.itens)
      for (let i = 0; i < cart?.itens.length; i++) {
        if (cartItem.productId === cart.itens[i].productId && cartItem.frequency === cart.itens[i].frequency)
          cart.itens.splice(i, 1);
      };

    return await this.daoCart.save(cart);
  };
};

export default UCManagerCart;