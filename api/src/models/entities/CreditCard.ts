import mongoose from 'mongoose';

import Crypt from '../utils/Crypt';
import SanitizerString from '../utils/SanitizerString';
import Client from './Client';

class CreditCard {
  id: mongoose.Types.ObjectId | string | undefined;
  client: Client | Client['id'];

  brand: string | null;
  name: string | null;
  number: Array<string> = [];
  expiry: Date | null;
  cvc: string | null;

  cardHash: string | null;

  createdAt: Date | null;
  isActive: boolean | null;

  private crypt: Crypt = new Crypt();

  constructor(id: CreditCard['id'], client: CreditCard['client'], brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiry: CreditCard['expiry'], cvc: CreditCard['cvc'], cardHash: CreditCard['cardHash'], createdAt: CreditCard['createdAt'], isActive: CreditCard['isActive']) {
    this.id = SanitizerString.stringOrUndefined(id);
    this.client = client;

    this.brand = SanitizerString.stringOrNull(brand);
    this.name = SanitizerString.stringOrNull(name);
    this.number = number;
    this.expiry = expiry;
    this.cvc = SanitizerString.stringOrNull(cvc);

    this.cardHash = cardHash !== null ? cardHash : this.crypt.hashMD5(number.join());

    this.createdAt = createdAt;
    this.isActive = isActive;
  };

  public setNumber(number: CreditCard['number']) {
    this.number = number;
    this.cardHash = number !== null ? this.crypt.hashMD5(number.join()) : null;
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
    return new CreditCard(undefined, client, brand, name, number, expiry, cvc, null, new Date(), true);
  };

  public static getUpdate(id: mongoose.Types.ObjectId | string, client: mongoose.Types.ObjectId | string, brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiry: CreditCard['expiry'], cvc: CreditCard['cvc'], isActive: CreditCard['isActive']) {
    return new CreditCard(id, client, brand, name, number, expiry, cvc, null, null, isActive);
  };

  public static fromObject(creditCard: CreditCard) {
    return new CreditCard(creditCard.id, creditCard.client, creditCard.brand, creditCard.name, creditCard.number, creditCard.expiry, creditCard.cvc, creditCard.cardHash, creditCard.createdAt, creditCard.isActive);
  };
};

export default CreditCard;