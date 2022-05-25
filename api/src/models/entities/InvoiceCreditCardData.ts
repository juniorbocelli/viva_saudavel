import CreditCard from './CreditCard';
import SanitizerString from '../utils/SanitizerString';

class InvoiceCreditCardData {
  brand: string;
  name: string;
  number: Array<string>;
  expiry: Date;
  cvc: string;

  constructor(brand: InvoiceCreditCardData['brand'], name: InvoiceCreditCardData['name'], number: InvoiceCreditCardData['number'], expiry: InvoiceCreditCardData['expiry'], cvc: InvoiceCreditCardData['cvc']) {
    this.brand = SanitizerString.removeSpaces(brand);
    this.name = SanitizerString.removeSpaces(name);
    this.number = number;
    this.expiry = expiry;
    this.cvc = cvc;
  };

  public static getFromCreditCard(creditCard: CreditCard): InvoiceCreditCardData {
    return new InvoiceCreditCardData(creditCard.brand, creditCard.name, creditCard.number, creditCard.expiry, creditCard.cvc);
  };
};

export default InvoiceCreditCardData;