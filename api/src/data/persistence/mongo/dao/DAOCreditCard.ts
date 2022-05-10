import mongoose from 'mongoose';

import DAO from '../../../utils/DAO';
import CreditCardSchema from '../../schemas/CreditCardSchema';
import CreditCard from '../../../../models/entities/CreditCard';

class DAOCreditCard implements DAO<CreditCard, string> {
  isValidObjectId(creditCard: CreditCard | string): boolean {

    if (creditCard instanceof CreditCard)
      if (typeof (creditCard.id) !== "undefined")
        return mongoose.Types.ObjectId.isValid(creditCard.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(creditCard);
  };

  async save(creditCard: CreditCard) {
    let creditCardSchema: CreditCard & mongoose.Document<any, any, CreditCard>;

    creditCardSchema = new CreditCardSchema({
      clientId: creditCard.clientId,

      brand: creditCard.brand,
      name: creditCard.name,
      number: creditCard.number,
      expiryDate: creditCard.expiryDate,
      cvv: creditCard.cvv,

      createdAt: creditCard.createdAt,
      isActive: creditCard.isActive,
    });
    creditCard.id = creditCardSchema._id;

    await creditCardSchema.save();

    return creditCard;
  };

  async update(creditCard: CreditCard) {
    if (!this.isValidObjectId(creditCard))
      throw 'O id do cartão é inválido';

    const foundedCreditCard = await CreditCardSchema.findById(creditCard.id);

    if (foundedCreditCard === null)
      throw 'Cartão inválido'

    const updatedCreditCard = {
      clientId: creditCard.clientId,

      brand: creditCard.brand || foundedCreditCard.brand,
      name: creditCard.name || foundedCreditCard.name,
      number: creditCard.number || foundedCreditCard.number,
      expiryDate: creditCard.expiryDate || foundedCreditCard.expiryDate,
      cvv: creditCard.cvv || foundedCreditCard.cvv,

      createdAt: creditCard.createdAt,
      isActive: creditCard.isActive || foundedCreditCard.isActive,
    };

    return await CreditCardSchema.findByIdAndUpdate(creditCard.id, updatedCreditCard, { new: true });
  };

  async saveOrUpdate(creditCard: CreditCard) {
    if (typeof (creditCard.id) === "undefined") {
      return this.save(creditCard);
    };

    if (!this.isValidObjectId(creditCard))
      throw `O id do cartão é inválido`;

    const singleCreditCard = await CreditCardSchema.findById(creditCard.id);

    if (singleCreditCard === null)
      return this.save(creditCard);
    else
      return this.update(creditCard);
  };

  async saveOrUpdateWithReturnId(creditCard: CreditCard): Promise<string> {
    await this.saveOrUpdate(creditCard);

    return creditCard.id!?.toString();
  };

  async delete(id: string) {
    if (!this.isValidObjectId(id))
      throw `O id do cartão é inválido`;

    await CreditCardSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<CreditCard | null> {
    const creditCard = await CreditCardSchema.findById(id);

    if (creditCard === null)
      return null;

    return new CreditCard(creditCard.id, creditCard.clientId, creditCard.brand, creditCard.name, creditCard.number, creditCard.expiryDate, creditCard.cvv, creditCard.createdAt, creditCard.isActive);
  };

  async selectAll(): Promise<Array<CreditCard>> {
    const creditCards = await CreditCardSchema.find();
    let creditCardsToReturn: Array<CreditCard> = [];

    creditCards.forEach((creditCard) => {
      creditCardsToReturn.push(new CreditCard(creditCard.id, creditCard.clientId, creditCard.brand, creditCard.name, creditCard.number, creditCard.expiryDate, creditCard.cvv, creditCard.createdAt, creditCard.isActive));
    });
    return creditCardsToReturn;
  };

  async selectBy(query: Object): Promise<Array<CreditCard>> {
    const creditCards = await CreditCardSchema.find(query).exec();
    let creditCardsToReturn: Array<CreditCard> = [];

    creditCards.forEach((creditCard) => {
      creditCardsToReturn.push(new CreditCard(creditCard.id, creditCard.clientId, creditCard.brand, creditCard.name, creditCard.number, creditCard.expiryDate, creditCard.cvv, creditCard.createdAt, creditCard.isActive));
    });
    return creditCardsToReturn;
  };
};

export default DAOCreditCard;