import Checkout from '../entities/Checkout';
import Invoice from '../entities/Invoice';
import CartItem from '../entities/CartItem';
import Product from '../entities/Product';

import DAOInvoice from '../../data/persistence/mongo/dao/DAOInvoice';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';
import DAOCreditCard from '../../data/persistence/mongo/dao/DAOCreditCard';
import DAOCheckout from '../../data/persistence/mongo/dao/DAOCheckout';
import DAOCart from '../../data/persistence/mongo/dao/DAOCart';

import UCManagerClient from './UCManagerClient';
import UCManagerProduct from './UCManagerProduct';
import UCManagerCreditCard from './UCManagerCreditCard';
import UCManagerCheckout from './UCManagerCheckout';

import APIShipping from '../../data/apis/APIShipping';
import SHIPPING_SETTING from '../../settings/shipping.json';

import Delivery from '../utils/Delivery';
import DELIVERY_SETTINGS from '../../settings/delivery.json'

import Math from '../utils/Math';
import CreditCard from '../entities/CreditCard';

class UCManagerInvoice {
  private daoInvoice: DAOInvoice;

  private ucManagerProductPersistence: UCManagerProduct;
  private ucManagerClientPersistence: UCManagerClient;
  private ucManagerCreditCardPersistence: UCManagerCreditCard;
  private ucManagerCheckoutPersistence: UCManagerCheckout;

  private apiShipping: APIShipping;
  private delivery: Delivery;

  constructor(daoInvoice: DAOInvoice, daoProduct: DAOProduct, daoClient: DAOClient, daoCreditCard: DAOCreditCard, daoCheckout: DAOCheckout, daoCart: DAOCart) {
    this.daoInvoice = daoInvoice;

    this.ucManagerProductPersistence = new UCManagerProduct(daoProduct);
    this.ucManagerClientPersistence = new UCManagerClient(daoClient);
    this.ucManagerCreditCardPersistence = new UCManagerCreditCard(daoCreditCard);
    this.ucManagerCheckoutPersistence = new UCManagerCheckout(daoCheckout, daoCart, daoProduct, daoClient);

    this.apiShipping = new APIShipping(SHIPPING_SETTING.minValToFreeShipping);
    this.delivery = new Delivery(DELIVERY_SETTINGS.minDaysToFirstDelivery, DELIVERY_SETTINGS.isDeliveryInHolidays, DELIVERY_SETTINGS.isDeliveryInWeekends);
  };

  private async getShippingValue(cep: string): Promise<string> {
    return await this.apiShipping.getValueByCep(SHIPPING_SETTING.originCep, cep);
  };

  private getFirstDeliveryDay(weekDay: Invoice['deliveryWeekDay']): Date {
    return this.delivery.getFirstDeliveryDate(weekDay);
  };

  private async getValidCreditCard(clientId: string): Promise<CreditCard | null> {
    return this.ucManagerCreditCardPersistence.getActiveByClientId(clientId);
  };

  private async populateProducts(items: Checkout['items']): Promise<Array<CartItem>> {
    let cartItems: Array<CartItem> = [];

    for (let cartItem of items) {
      let product: Product | null;

      if (cartItem.product instanceof Product)
        product = await this.ucManagerProductPersistence.get(cartItem.product.id as string);
      else
        product = await this.ucManagerProductPersistence.get(cartItem.product);

      if (product !== null)
        if (product.isActive)
          if (product.quantity === null)
            cartItems.push({ frequency: cartItem.frequency, product: product });
          else if (product.quantity > 0)
            cartItems.push({ frequency: cartItem.frequency, product: product });
    };

    return cartItems;
  };

  public async newFromNewCheckout(checkout: Checkout) {
    // Get valid credit card
    const creditCard = await this.getValidCreditCard(checkout.client as string);

    if (creditCard === null)
      throw new Error("Cliente não possui cartão de crédito válido");

    // Decrypt credit card
    creditCard.decryptCard();

    // Get client
    const client = await this.ucManagerClientPersistence.getById(checkout.client as string)

    if (client === null)
      throw new Error("Cliente inválido");

    checkout.client = client;

    // Populate products
    checkout.items = await this.populateProducts(checkout.items);

    // Calculate delivery date
    const deliveryDate = this.getFirstDeliveryDay(checkout.deliveryDay);

    // Calculate shipping value
    const shippingValue = Math.currencyToFloat(await this.getShippingValue(client.address.cep));

    // Get first invoice
    const invoice = Invoice.getNewFromEntities(checkout, creditCard, 'all', deliveryDate, shippingValue, 0);

    try {
      return this.daoInvoice.save(invoice.getFlatInvoice());
    } catch (error) {
      this.ucManagerCheckoutPersistence.remove(checkout);

      throw new Error(error as string);
    };
  };

  public async getClientInvoice(clientId: string, id: string): Promise<Invoice | null> {
    const invoices = await this.daoInvoice.selectBy({ client: clientId, _id: id });

    if (invoices.length === 0)
      return null;

    return invoices[0];
  };

  public async getAdminInvoice(id: string): Promise<Invoice | null> {
    const invoice = await this.daoInvoice.select(id);

    return invoice;
  };
};

export default UCManagerInvoice;