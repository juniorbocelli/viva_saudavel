import Checkout from '../entities/Checkout';
import Product from '../entities/Product';
import CartItem from '../entities/CartItem';
import Client from '../entities/Client';
import DeliveryDates from '../entities/DeliveryDates';
import Delivery from '../utils/Delivery';

import DAOCheckout from '../../data/persistence/mongo/dao/DAOCheckout';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';

import UCManagerCart from './UCManagerCart';
import UCManagerProduct from './UCManagerProduct';
import UCManagerClient from './UCManagerClient';

import DELIVERY_SETTINGS from '../../settings/delivery.json'

class UCManagerCheckout {
  private daoCheckout: DAOCheckout;
  private ucManagerCartPersistence: UCManagerCart;
  private ucManagerProductPersistence: UCManagerProduct;
  private ucManagerClientPersistence: UCManagerClient;

  private delivery: Delivery;

  constructor(daoCheckout: DAOCheckout, daoCart: DAOCart, daoProduct: DAOProduct, daoClient: DAOClient) {
    this.daoCheckout = daoCheckout;
    this.ucManagerCartPersistence = new UCManagerCart(daoCart, daoProduct, daoClient);
    this.ucManagerProductPersistence = new UCManagerProduct(daoProduct);
    this.ucManagerClientPersistence = new UCManagerClient(daoClient);

    this.delivery = new Delivery(DELIVERY_SETTINGS.minDaysToFirstDelivery, DELIVERY_SETTINGS.isDeliveryInHolidays, DELIVERY_SETTINGS.isDeliveryInWeekends);
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

  public async getAllCheckoutWithFilterClient(clientId: string, filter: Object): Promise<Array<Checkout>> {
    const checkouts = await this.daoCheckout.selectBy({ client: clientId, ...filter });

    for (let checkout of checkouts) {
      checkout = await this.populateAll(checkout)
    };

    return checkouts;
  };

  public async getAllCheckoutWithFilterAdmin(filter: Object): Promise<Array<Checkout>> {
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

  public async getCheckoutClient(clientId: string, id: string): Promise<Checkout> {
    const checkouts = await this.daoCheckout.selectBy({ client: clientId, _id: id });

    if (checkouts.length === 0)
      throw new Error("Carrinho inválido");

    return await this.populateAll(checkouts[0]);
  };

  public async getCheckoutAdmin(id: string): Promise<Checkout> {
    const checkout = await this.daoCheckout.select(id);

    if (checkout === null)
      throw new Error("Carrinho inválido");

    return checkout;
  };

  public async getNextDeliveryDayClient(clientId: string, id: string): Promise<DeliveryDates> {
    const checkouts = await this.daoCheckout.selectBy({ clientId: clientId, _id: id });

    let checkout: Checkout;

    let frequency: Array<string> = [];
    let weeklyDate: Date | null;
    let biweeklyDate: Date | null;
    let monthlyDate: Date | null;

    if (checkouts.length === 0)
      throw new Error("Checkout inválido");

    checkout = checkouts[0];

    // Check first delivery
    if (new Date() < this.delivery.getFirstDeliveryDate(checkout.deliveryDay, checkout.createdAt)) {
      let day = this.delivery.getFirstDeliveryDate(checkout.deliveryDay, checkout.createdAt)
      return new DeliveryDates(day, day, day, day);
    };

    // Check frequency
    checkout.items.forEach(item => {
      frequency.push(item.frequency);
    });

    // Weekly date
    if (frequency.indexOf('weekly') !== -1)
      weeklyDate = this.delivery.getNextDeliveryDay('weekly', checkout.createdAt);
    else
      weeklyDate = null;

    // Biweekly date
    if (frequency.indexOf('biweekly') !== -1)
      biweeklyDate = this.delivery.getNextDeliveryDay('biweekly', checkout.createdAt);
    else
      biweeklyDate = null;

    // Monthly date
    if (frequency.indexOf('monthly') !== -1)
      monthlyDate = this.delivery.getNextDeliveryDay('monthly', checkout.createdAt);
    else
      monthlyDate = null;

    return new DeliveryDates(null, weeklyDate, biweeklyDate, monthlyDate);
  };

  public async getNextDeliveryDayAdmin(id: string): Promise<DeliveryDates> {
    const checkout = await this.daoCheckout.select(id);

    let frequency: Array<string> = [];
    let weeklyDate: Date | null;
    let biweeklyDate: Date | null;
    let monthlyDate: Date | null;

    if (checkout === null)
      throw new Error("Checkout inválido");

    // Check first delivery
    if (new Date() < this.delivery.getFirstDeliveryDate(checkout.deliveryDay, checkout.createdAt)) {
      let day = this.delivery.getFirstDeliveryDate(checkout.deliveryDay, checkout.createdAt)
      return new DeliveryDates(day, day, day, day);
    };

    // Check frequency
    checkout.items.forEach(item => {
      frequency.push(item.frequency);
    });

    // Weekly date
    if (frequency.indexOf('weekly') !== -1)
      weeklyDate = this.delivery.getNextDeliveryDay('weekly', checkout.createdAt);
    else
      weeklyDate = null;

    // Biweekly date
    if (frequency.indexOf('biweekly') !== -1)
      biweeklyDate = this.delivery.getNextDeliveryDay('biweekly', checkout.createdAt);
    else
      biweeklyDate = null;

    // Monthly date
    if (frequency.indexOf('monthly') !== -1)
      monthlyDate = this.delivery.getNextDeliveryDay('monthly', checkout.createdAt);
    else
      monthlyDate = null;

    return new DeliveryDates(null, weeklyDate, biweeklyDate, monthlyDate);
  };
};

export default UCManagerCheckout;