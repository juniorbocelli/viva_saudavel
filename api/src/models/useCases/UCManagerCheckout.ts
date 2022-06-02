import Checkout from '../entities/Checkout';
import Product from '../entities/Product';
import CartItem from '../entities/CartItem';
import Client from '../entities/Client';

import DAOCheckout from '../../data/persistence/mongo/dao/DAOCheckout';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';

import UCManagerCart from './UCManagerCart';
import UCManagerProduct from './UCManagerProduct';
import UCManagerClient from './UCManagerClient';

class UCManagerCheckout {
  private daoCheckout: DAOCheckout;
  private ucManagerCartPersistence: UCManagerCart;
  private ucManagerProductPersistence: UCManagerProduct;
  private ucManagerClientPersistence: UCManagerClient;

  constructor(daoCheckout: DAOCheckout, daoCart: DAOCart, daoProduct: DAOProduct, daoClient: DAOClient) {
    this.daoCheckout = daoCheckout;
    this.ucManagerCartPersistence = new UCManagerCart(daoCart, daoProduct, daoClient);
    this.ucManagerProductPersistence = new UCManagerProduct(daoProduct);
    this.ucManagerClientPersistence = new UCManagerClient(daoClient);
  };

  private async populateProducts(checkoutItems: Array<CartItem>): Promise<Array<CartItem>> {
    let populatedItems: Array<CartItem> = [];

    for (let item of checkoutItems)
      if (item.product instanceof Product) {
        populatedItems.push({ frequency: item.frequency, product: item.product });
      } else {
        let product = await this.ucManagerProductPersistence.get(item.product);
        if (product !== null)
          populatedItems.push({ frequency: item.frequency, product: product });
      };

    return populatedItems;
  };

  private async populateClient(clientCheckout: Checkout['client']): Promise<Client> {
    let client: Client | null;

    if (clientCheckout instanceof Client) {
      client = clientCheckout;
    } else {
      client = await this.ucManagerClientPersistence.getById(clientCheckout);

      if (client === null)
        throw new Error('Cliente inválido');
    };

    return client;
  };

  public async populateAll(checkout: Checkout): Promise<Checkout> {
    checkout.items = await this.populateProducts(checkout.items);
    checkout.client = await this.populateClient(checkout.client);

    return checkout;
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

  public async getAllClientWithFilter(clientId: string, filter: Object): Promise<Array<Checkout>> {
    const checkouts = await this.daoCheckout.selectBy({ client: clientId, ...filter });

    for (let checkout of checkouts) {
      checkout = await this.populateAll(checkout)
    };

    return checkouts;
  };

  public async getAllAdminWithFilter(filter: Object): Promise<Array<Checkout>> {
    const checkouts = await this.daoCheckout.selectBy(filter);

    for (let checkout of checkouts) {
      checkout = await this.populateAll(checkout)
    };

    return checkouts;
  };

  public async remove(checkout: Checkout | string) {
    if (checkout instanceof Checkout)
      return this.daoCheckout.delete(checkout.id as string);
    else
      return this.daoCheckout.delete(checkout);
  };
};

export default UCManagerCheckout;