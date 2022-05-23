import mongoose from 'mongoose';

import Crypt from '../utils/Crypt';
import SanitizerString from '../utils/SanitizerString';
import Client from './Client';

class CreditCard {
  id: string | null;
  client: Client | string;

  brand: string;
  name: string;
  number: Array<string>;
  expiry: Date;
  cvc: string;

  cardHash: string | null;

  createdAt: Date;
  isActive: boolean;

  private crypt: Crypt = new Crypt();

  constructor(id: CreditCard['id'] | mongoose.Types.ObjectId, client: CreditCard['client'], brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiry: CreditCard['expiry'], cvc: CreditCard['cvc'], cardHash: CreditCard['cardHash'], createdAt: CreditCard['createdAt'], isActive: CreditCard['isActive']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);
    this.client = client;

    this.brand = SanitizerString.removeSpaces(brand);
    this.name = SanitizerString.removeSpaces(name);
    this.number = number;
    this.expiry = expiry;
    this.cvc = cvc;

    this.cardHash = this.crypt.hashMD5(number.join());

    this.createdAt = createdAt;
    this.isActive = isActive;
  };

  public setNumber(number: CreditCard['number']) {
    this.number = number;
    this.cardHash = this.crypt.hashMD5(number.join());
  };

  private encryptNumber(): void {
    if (this.number !== null)
      for (let i = 0; i < this.number.length - 1; i++)
        this.number[i] = this.crypt.cryptText(this.number[i])
    else
      throw new Error("Número do cartão não definido");
  };

  private decryptNumber(): void {
    if (this.number !== null)
      for (let i = 0; i < this.number.length - 1; i++)
        this.number[i] = this.crypt.decryptText(this.number[i])
    else
      throw new Error("Número do cartão não definido");
  };

  private encryptCvc(): void {
    if (this.cvc !== null)
      this.cvc = this.crypt.cryptText(this.cvc);
    else
      throw new Error("CVC do cartão não definido");
  };

  private decryptCvc(): void {
    if (this.cvc !== null)
      this.cvc = this.crypt.decryptText(this.cvc);
    else
      throw new Error("CVC do cartão não definido");
  };

  public encryptCard(): void {
    this.encryptNumber()
    this.encryptCvc();
  };

  public decryptCard(): void {
    this.decryptNumber()
    this.decryptCvc();
  };

  public static getNew(client: CreditCard['client'], brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiry: CreditCard['expiry'], cvc: CreditCard['cvc']): CreditCard {
    return new CreditCard(null, client, brand, name, number, expiry, SanitizerString.onlyNumbers(cvc), null, new Date(), true);
  };

  // previousCredicard: send only desincrypted cart
  public static getUpdated(o: Object, previousCreditCard: CreditCard): CreditCard {
    let creditCard = o as CreditCard;

    const updatedCreditCard = {
      // Imutable fields
      id: previousCreditCard.id,
      createdAt: previousCreditCard.createdAt,
      client: previousCreditCard.client,

      brand: creditCard['brand'] ? SanitizerString.removeSpaces(creditCard['brand']) : previousCreditCard.brand,
      name: creditCard['name'] ? SanitizerString.removeSpaces(creditCard['name']) : previousCreditCard.name,
      expiry: creditCard['expiry'] || previousCreditCard.expiry,
      number: creditCard['number'] || previousCreditCard.number,
      cvc: SanitizerString.onlyNumbers(creditCard['cvc']) || SanitizerString.onlyNumbers(previousCreditCard.cvc),

      isActive: previousCreditCard.isActive,
    };

    return this.getFromObject(updatedCreditCard as CreditCard);
  };

  public static getFromObject(creditCard: CreditCard): CreditCard {
    return new CreditCard(creditCard.id, creditCard.client, creditCard.brand, creditCard.name, creditCard.number, creditCard.expiry, creditCard.cvc, creditCard.cardHash, creditCard.createdAt, creditCard.isActive);
  };
};

export default CreditCard;