import Checkout from '../entities/Checkout';
import Product from '../entities/Product';
import CartItem from '../entities/CartItem';

import DAOCheckout from '../../data/persistence/mongo/dao/DAOCheckout';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';

import UCManagerCart from './UCManagerCart';
import UCManagerProduct from './UCManagerProduct';

class UCManagerCheckout {
  private daoCheckout: DAOCheckout;
  private ucManagerCartPersistence: UCManagerCart;
  private ucManagerProductPersistence: UCManagerProduct;

  constructor(daoCheckout: DAOCheckout, daoCart: DAOCart, daoProduct: DAOProduct, daoClient: DAOClient) {
    this.daoCheckout = daoCheckout;
    this.ucManagerCartPersistence = new UCManagerCart(daoCart, daoProduct, daoClient);
    this.ucManagerProductPersistence = new UCManagerProduct(daoProduct);
  };

  private async populateProducts(checkout: Checkout): Promise<Array<CartItem>> {
    let populatedItems: Array<CartItem> = [];

    for (let cartItem of checkout.items)
      if (cartItem.product instanceof Product)
        populatedItems.push({ frequency: cartItem.frequency, product: cartItem.product });
      else
        populatedItems.push({ frequency: cartItem.frequency, product: await this.ucManagerProductPersistence.get(cartItem.product) })

    return populatedItems;
  };

  public async new(checkout: Checkout) {
    await this.ucManagerCartPersistence.emptyCartByClientId(checkout.client as string);

    return this.daoCheckout.save(checkout);
  };

  public async searchUnprocessedCheckout() {

  };

  public async getAll(): Promise<Array<Checkout>> {
    return this.daoCheckout.selectAll();
  };

  public async getAllWithFilter(filter: Object): Promise<Array<Checkout>> {
    return this.daoCheckout.selectBy(filter);
  };
};

export default UCManagerCheckout;