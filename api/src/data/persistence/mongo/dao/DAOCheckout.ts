import mongoose from 'mongoose';

import DAO from '../../../utils/DAO';
import CheckoutSchema from '../../schemas/CheckoutSchema';
import Checkout from '../../../../models/entities/Checkout';

class DAOCheckout implements DAO<Checkout, string> {
  isValidObjectId(checkout: Checkout | string): boolean {

    if (checkout instanceof Checkout)
      if (checkout.id !== null)
        return mongoose.Types.ObjectId.isValid(checkout.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(checkout);
  };

  async save(checkout: Checkout) {
    let checkoutSchema: Checkout & mongoose.Document<any, any, Checkout>;

    checkoutSchema = new CheckoutSchema({
      client: checkout.client,
      items: checkout.items,

      deliveryDay: checkout.deliveryDay,

      createdAt: checkout.createdAt,
      isActive: checkout.isActive,
    });

    return Checkout.getFromObject(await checkoutSchema.save());
  };

  async update(checkout: Checkout) {
    if (!this.isValidObjectId(checkout))
      throw 'O id do checkout é inválido';

    const updatedCheckout = {
      client: checkout.client,
      items: checkout.items,

      deliveryDay: checkout.deliveryDay,

      createdAt: checkout.createdAt,
      isActive: checkout.isActive,
    };

    const updateCheckout = await CheckoutSchema.findByIdAndUpdate(checkout.id, updatedCheckout, { new: true });

    if (updateCheckout !== null)
      return Checkout.getFromObject(updateCheckout);

    return null;
  };

  async saveOrUpdate(checkout: Checkout) {
    if (typeof (checkout.id) === "undefined") {
      return this.save(checkout);
    };

    if (!this.isValidObjectId(checkout))
      throw `O id do checkout é inválido`;

    const singleCheckout = await CheckoutSchema.findById(checkout.id);

    if (singleCheckout === null)
      return this.save(checkout);
    else
      return this.update(checkout);
  };

  async saveOrUpdateWithReturnId(checkout: Checkout): Promise<string> {
    await this.saveOrUpdate(checkout);

    return checkout.id!?.toString();
  };

  async delete(id: string): Promise<void> {
    if (!this.isValidObjectId(id))
      throw `O id do checkout é inválido`;

    await CheckoutSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Checkout | null> {
    const checkout = await CheckoutSchema.findById(id);

    if (checkout === null)
      return null;

    return Checkout.getFromObject(checkout);
  };

  async selectAll(): Promise<Array<Checkout>> {
    const checkouts = await CheckoutSchema.find();
    let checkoutsToReturn: Array<Checkout> = [];

    checkouts.forEach((checkout) => {
      checkoutsToReturn.push(Checkout.getFromObject(checkout));
    });
    return checkoutsToReturn;
  };

  async selectBy(query: Object): Promise<Array<Checkout>> {
    const checkouts = await CheckoutSchema.find(query).exec();
    let checkoutsToReturn: Array<Checkout> = [];

    checkouts.forEach((checkout) => {
      checkoutsToReturn.push(Checkout.getFromObject(checkout));
    });
    return checkoutsToReturn;
  };

  async populate(checkout: Checkout, fields: Array<string>): Promise<Checkout> {
    const foundedCheckout = await CheckoutSchema.findById(checkout.id);

    if (foundedCheckout === null)
      throw 'Checkout inválido'

    fields.forEach(field => {
      foundedCheckout.populate(field);
    });

    return Checkout.getFromObject(foundedCheckout);
  };

  async selectAndPopulate(query: Object, fields: Array<string>): Promise<Array<Checkout>> {
    const checkouts = await CheckoutSchema.find(query).exec();

    let populatedCheckouts = checkouts.map(checkout => {
      fields.forEach(field => {
        checkout.populate(field);
      });

      return Checkout.getFromObject(checkout);
    });

    return populatedCheckouts;
  };
};

export default DAOCheckout;