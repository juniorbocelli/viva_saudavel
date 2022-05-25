import mongoose from 'mongoose';

import DAO from '../../../utils/DAO';
import InvoiceSchema from '../../schemas/InvoiceSchema';
import Invoice from '../../../../models/entities/Invoice';

class DAOInvoice implements DAO<Invoice, string> {
  isValidObjectId(invoice: Invoice | string): boolean {

    if (invoice instanceof Invoice)
      if (invoice.id !== null)
        return mongoose.Types.ObjectId.isValid(invoice.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(invoice);
  };

  async save(invoice: Invoice) {
    let invoiceSchema: Invoice & mongoose.Document<any, any, Invoice>;

    invoiceSchema = new InvoiceSchema({
      checkout: invoice.checkout,
      client: invoice.client,

      receiverData: invoice.receiverData,
      receiverAddress: invoice.receiverAddress,

      frequency: invoice.frequency,
      deliveryWeekDay: invoice.deliveryWeekDay,

      scheduledDeliveryDate: invoice.scheduledDeliveryDate,
      deliveryDate: invoice.deliveryDate,
      paymentDate: invoice.paymentDate,

      values: invoice.values,

      items: invoice.items,

      status: invoice.status,

      createdAt: invoice.createdAt,
    });

    return Invoice.getFromObject(await invoiceSchema.save());
  };

  async update(invoice: Invoice) {
    if (!this.isValidObjectId(invoice))
      throw 'O id da nota é inválido';

    const updatedInvoice = {
      checkout: invoice.checkout,
      client: invoice.client,

      receiverData: invoice.receiverData,
      receiverAddress: invoice.receiverAddress,

      frequency: invoice.frequency,
      deliveryWeekDay: invoice.deliveryWeekDay,

      scheduledDeliveryDate: invoice.scheduledDeliveryDate,
      deliveryDate: invoice.deliveryDate,
      paymentDate: invoice.paymentDate,

      values: invoice.values,

      items: invoice.items,

      status: invoice.status,

      createdAt: invoice.createdAt,
    };

    const updateInvoice = await InvoiceSchema.findByIdAndUpdate(invoice.id, updatedInvoice, { new: true });

    if (updateInvoice !== null)
      return Invoice.getFromObject(updateInvoice);

    return null;
  };

  async saveOrUpdate(invoice: Invoice) {
    if (typeof (invoice.id) === "undefined") {
      return this.save(invoice);
    };

    if (!this.isValidObjectId(invoice))
      throw `O id da nota é inválido`;

    const singleInvoice = await InvoiceSchema.findById(invoice.id);

    if (singleInvoice === null)
      return this.save(invoice);
    else
      return this.update(invoice);
  };

  async saveOrUpdateWithReturnId(invoice: Invoice): Promise<string> {
    await this.saveOrUpdate(invoice);

    return invoice.id!?.toString();
  };

  async delete(id: string): Promise<void> {
    if (!this.isValidObjectId(id))
      throw `O id da nota é inválido`;

    await InvoiceSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Invoice | null> {
    const invoice = await InvoiceSchema.findById(id);

    if (invoice === null)
      return null;

    return Invoice.getFromObject(invoice);
  };

  async selectAll(): Promise<Array<Invoice>> {
    const invoices = await InvoiceSchema.find();
    let invoicesToReturn: Array<Invoice> = [];

    invoices.forEach((invoice) => {
      invoicesToReturn.push(Invoice.getFromObject(invoice));
    });
    return invoicesToReturn;
  };

  async selectBy(query: Object): Promise<Array<Invoice>> {
    const invoices = await InvoiceSchema.find(query).exec();
    let invoicesToReturn: Array<Invoice> = [];

    invoices.forEach((invoice) => {
      invoicesToReturn.push(Invoice.getFromObject(invoice));
    });
    return invoicesToReturn;
  };

  async populate(invoice: Invoice, fields: Array<string>): Promise<Invoice> {
    const foundedInvoice = await InvoiceSchema.findById(invoice.id);

    if (foundedInvoice === null)
      throw 'Nota inválida'

    fields.forEach(field => {
      foundedInvoice.populate(field);
    });

    return Invoice.getFromObject(foundedInvoice);
  };

  async selectAndPopulate(query: Object, fields: Array<string>): Promise<Array<Invoice>> {
    const invoices = await InvoiceSchema.find(query).exec();

    let populatedInvoices = invoices.map(invoice => {
      fields.forEach(field => {
        invoice.populate(field);
      });

      return Invoice.getFromObject(invoice);
    });

    return populatedInvoices;
  };
};

export default DAOInvoice;