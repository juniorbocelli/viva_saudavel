import mongoose from 'mongoose';

import DAO from '../../../utils/DAO';
import CreditCardSchema from '../../schemas/CreditCardSchema';
import CreditCard from '../../../../models/entities/CreditCard';

class DAOCreditCard implements DAO<CreditCard, string> {
  isValidObjectId(creditCard: CreditCard | string): boolean {

    if (creditCard instanceof CreditCard)
      if (creditCard.id !== null)
        return mongoose.Types.ObjectId.isValid(creditCard.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(creditCard);
  };

  async save(creditCard: CreditCard) {
    let creditCardSchema: CreditCard & mongoose.Document<any, any, CreditCard>;

    creditCardSchema = new CreditCardSchema({
      client: creditCard.client,

      brand: creditCard.brand,
      name: creditCard.name,
      number: creditCard.number,
      expiry: creditCard.expiry,
      cvc: creditCard.cvc,

      cardHash: creditCard.cardHash,

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

    const updatedCreditCard = {
      client: creditCard,

      brand: creditCard.brand,
      name: creditCard.name,
      number: creditCard.number,
      expiry: creditCard.expiry,
      cvv: creditCard.cvc,

      cardHash: creditCard.cardHash,

      createdAt: creditCard.createdAt,
      isActive: creditCard.isActive,
    };

    const updateCreditCard = await CreditCardSchema.findByIdAndUpdate(creditCard.id, updatedCreditCard, { new: true });

    if (updateCreditCard !== null)
      return CreditCard.getFromObject(updateCreditCard);

    return null;
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

  async delete(id: string): Promise<void> {
    if (!this.isValidObjectId(id))
      throw `O id do cartão é inválido`;

    await CreditCardSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<CreditCard | null> {
    const creditCard = await CreditCardSchema.findById(id);

    if (creditCard === null)
      return null;

    return CreditCard.getFromObject(creditCard);
  };

  async selectAll(): Promise<Array<CreditCard>> {
    const creditCards = await CreditCardSchema.find();
    let creditCardsToReturn: Array<CreditCard> = [];

    creditCards.forEach((creditCard) => {
      creditCardsToReturn.push(CreditCard.getFromObject(creditCard));
    });
    return creditCardsToReturn;
  };

  async selectBy(query: Object): Promise<Array<CreditCard>> {
    const creditCards = await CreditCardSchema.find(query).exec();
    let creditCardsToReturn: Array<CreditCard> = [];

    creditCards.forEach((creditCard) => {
      creditCardsToReturn.push(CreditCard.getFromObject(creditCard));
    });
    return creditCardsToReturn;
  };

  async populate(creditCard: CreditCard, fields: Array<string>): Promise<CreditCard> {
    const foundedCreditCard = await CreditCardSchema.findById(creditCard.id);

    if (foundedCreditCard === null)
      throw 'Cartão inválido'

    fields.forEach(field => {
      foundedCreditCard.populate(field);
    });

    return CreditCard.getFromObject(foundedCreditCard);
  };

  async selectAndPopulate(query: Object, fields: Array<string>): Promise<Array<CreditCard>> {
    const creditCards = await CreditCardSchema.find(query).exec();

    let populatedCreditCards = creditCards.map(creditCard => {
      fields.forEach(field => {
        creditCard.populate(field);
      });

      return creditCard;
    });

    return populatedCreditCards;
  };
};

export default DAOCreditCard;