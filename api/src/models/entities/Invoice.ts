import mongoose from 'mongoose';

import Client from './Client';
import Address from './Address';
import Checkout from './Checkout';
import CreditCard from './CreditCard';

import InvoiceReceiverData from './InvoiceReceiverData';
import InvoiceValues from './InvoiceValues';
import InvoiceProductData from './InvoiceProductData';
import { WeekDaysName } from '../utils/Dates';
import SanitizerString from '../utils/SanitizerString';

class Invoice {
  id: string | null;

  checkout: Checkout | string;
  client: Client | string;

  receiverData: InvoiceReceiverData;
  receiverAddress: Address;

  creditCardData: CreditCard;

  frequency: 'all' |'once' | 'weekly' | 'biweekly' | 'monthly';
  deliveryWeekDay: WeekDaysName;

  scheduledDeliveryDate: Date;
  deliveryDate: Date | null;
  paymentDate: Date | null;

  values: InvoiceValues;

  items: Array<InvoiceProductData>;

  status: 'awaitingPayment' | 'paymentAccept' | 'paymentFailed' | 'preparingForShipping' | 'dispatched' | 'delivered' | 'returned' | 'canceled';

  createdAt: Date;

  constructor(id: Invoice['id'] | mongoose.Types.ObjectId, checkout: Invoice['checkout'], client: Invoice['client'], receiverData: Invoice['receiverData'], receiverAddress: Invoice['receiverAddress'], creditCardData: Invoice['creditCardData'], frequency: Invoice['frequency'], deliveryWeekDay: Invoice['deliveryWeekDay'], scheduledDeliveryDate: Invoice['scheduledDeliveryDate'], deliveryDate: Invoice['deliveryDate'], paymentDate: Invoice['paymentDate'], values: Invoice['values'], items: Invoice['items'], status: Invoice['status'], createdAt: Invoice['createdAt']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);

    this.checkout = checkout;
    this.client = client;

    this.receiverData = receiverData;
    this.receiverAddress = receiverAddress;

    this.creditCardData = creditCardData;

    this.frequency = frequency;
    this.deliveryWeekDay = deliveryWeekDay;

    this.scheduledDeliveryDate = scheduledDeliveryDate;
    this.deliveryDate = deliveryDate;
    this.paymentDate = paymentDate;

    this.values = values;

    this.items = items;

    this.status = status;

    this.createdAt = createdAt;
  };

  public static getNew(checkout: Invoice['checkout'], client: Invoice['client'], receiverData: Invoice['receiverData'], receiverAddress: Invoice['receiverAddress'], creditCardData: Invoice['creditCardData'], frequency: Invoice['frequency'], deliveryWeekDay: Invoice['deliveryWeekDay'], scheduledDeliveryDate: Invoice['scheduledDeliveryDate'], values: Invoice['values'], items: Invoice['items']): Invoice {
    return new Invoice(null, checkout, client, receiverData, receiverAddress, creditCardData, frequency, deliveryWeekDay, scheduledDeliveryDate, null, null, values, items, 'awaitingPayment', new Date());
  };

  public static getNewFromEntities(checkout: Checkout, creditCard: CreditCard, frequency: Invoice['frequency'], scheduledDeliveryDate: Invoice['scheduledDeliveryDate'], shippingValue: InvoiceValues['shippingValue'], discounts: InvoiceValues['discounts']): Invoice {
    return new Invoice(null, checkout, checkout.client, InvoiceReceiverData.getNewFromClient(checkout.client as Client), Address.getFromObject((checkout.client as Client).address), creditCard, frequency, checkout.deliveryDay, scheduledDeliveryDate, null, null, InvoiceValues.getFromCheckoutItems(shippingValue, discounts, checkout.items), InvoiceProductData.getListFromCartItemList(checkout.items), 'awaitingPayment', new Date());
  };

  public static getUpdated(o: Object, previousInvoice: Invoice): Invoice {
    let invoice = o as Invoice;

    const updatedInvoice = {
      // Imutable fields
      id: previousInvoice.id,
      checkout: previousInvoice.checkout,
      client: previousInvoice.client,
      receiverData: previousInvoice.receiverData,
      receiverAddress: previousInvoice.receiverAddress,
      frequency: previousInvoice.frequency,
      deliveryWeekDay: previousInvoice.deliveryWeekDay,
      scheduledDeliveryDate: previousInvoice.scheduledDeliveryDate,
      values: previousInvoice.values,
      items: previousInvoice.items,
      createdAt: previousInvoice.createdAt,

      creditCardData: invoice['creditCardData'] || previousInvoice.creditCardData,

      deliveryDate: invoice['deliveryDate'] || previousInvoice.deliveryDate,
      paymentDate: invoice['paymentDate'] || previousInvoice.paymentDate,
      status: invoice['status'] || previousInvoice.status,
    };

    return Invoice.getFromObject(updatedInvoice as Invoice);
  };

  public static getFromObject(i: Invoice): Invoice {
    return new Invoice(i.id, i.checkout, i.client, i.receiverData, i.receiverAddress, i.creditCardData, i.frequency, i.deliveryWeekDay, i.scheduledDeliveryDate, i.deliveryDate, i.paymentDate, i.values, i.items, i.status, i.createdAt);
  };
};

export default Invoice;