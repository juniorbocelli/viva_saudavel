import Checkout from '../entities/Checkout';

import DAOCheckout from '../../data/persistence/mongo/dao/DAOCheckout';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';

import UCManagerCart from './UCManagerCart';

class UCManagerCheckout {
  private daoCheckout: DAOCheckout;
  private ucManagerCartPersistence: UCManagerCart;

  constructor(daoCheckout: DAOCheckout, daoCart: DAOCart, daoProduct: DAOProduct) {
    this.daoCheckout = daoCheckout;
    this.ucManagerCartPersistence = new UCManagerCart(daoCart, daoProduct);
  };

  public async new(checkout: Checkout) {
    await this.ucManagerCartPersistence.emptyCartByClientId(checkout.client as string);

    return this.daoCheckout.save(checkout);
  };
};

export default UCManagerCheckout;