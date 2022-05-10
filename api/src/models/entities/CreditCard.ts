import mongoose from 'mongoose';

import Crypt from '../utils/Crypt';
import SanitizerString from '../utils/SanitizerString';

class CreditCard {
  id: mongoose.Types.ObjectId | string | undefined;
  clientId: mongoose.Types.ObjectId | string | null;

  brand: string | null;
  name: string | null;
  number: Array<string> | null = new Array<string>(4);
  expiryDate: Date | null;
  cvv: string | null;

  createdAt: Date | null;
  isActive: boolean | null;

  private crypt: Crypt = new Crypt();

  constructor(id: CreditCard['id'], clientId: CreditCard['clientId'], brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiryDate: CreditCard['expiryDate'], cvv: CreditCard['cvv'], createdAt: CreditCard['createdAt'], isActive: CreditCard['isActive']) {
    this.id = SanitizerString.stringOrUndefined(id);
    this.clientId = SanitizerString.stringOrNull(clientId);

    this.brand = SanitizerString.stringOrNull(brand);
    this.name = SanitizerString.stringOrNull(name);
    this.number = number;
    this.expiryDate = expiryDate;
    this.cvv = SanitizerString.stringOrNull(cvv);

    this.createdAt = createdAt;
    this.isActive = isActive;
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

  private encryptCvv(): void {
    if (this.cvv !== null)
      this.cvv = this.crypt.cryptText(this.cvv);
    else
      throw new Error("CVV do cartão não definido");
  };

  private decryptCvv(): void {
    if (this.cvv !== null)
      this.cvv = this.crypt.decryptText(this.cvv);
    else
      throw new Error("CVV do cartão não definido");
  };

  public encryptCard(): void {
    this.encryptNumber()
    this.encryptCvv();
  };

  public decryptCard(): void {
    this.decryptNumber()
    this.decryptCvv();
  };

  public static getNew(clientId: CreditCard['clientId'], brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiryDate: CreditCard['expiryDate'], cvv: CreditCard['cvv']): CreditCard {
    return new CreditCard(undefined, clientId, brand, name, number, expiryDate, cvv, new Date(), true);
  };

  public static getUpdate(id: mongoose.Types.ObjectId | string, clientId: mongoose.Types.ObjectId | string, brand: CreditCard['brand'], name: CreditCard['name'], number: CreditCard['number'], expiryDate: CreditCard['expiryDate'], cvv: CreditCard['cvv'], isActive: CreditCard['isActive']) {
    return new CreditCard(id, clientId, brand, name, number, expiryDate, cvv, null, isActive);
  };
};

export default CreditCard;