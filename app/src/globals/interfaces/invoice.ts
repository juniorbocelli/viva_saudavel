import { CheckoutAPI } from './checkout';
import { Client, Address } from './client';
import { CreditCard } from './creditCard';
import { WeekDaysName, Frequency } from './dateTime';

export interface InvoiceReceiverData {
  name: string;
  cpf: string;
  email: string;
  cellPhone: string;
};

export interface InvoiceValues {
  productsValue: number;
  shippingValue: number;
  discounts: number;
  totalValue: number;
};

export type InvoiceStatus = 'awaitingPayment' | 'paymentAccept' | 'paymentFailed' | 'preparingForShipping' | 'dispatched' | 'delivered' | 'returned' | 'canceled' | 'finished';

export interface InvoiceProductData {
  id: string | null;

  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;

  thumb: string;

  price: number;
};

export interface Invoice {
  id: string | null;

  checkout: CheckoutAPI | string;
  client: Client | string;

  receiverData: InvoiceReceiverData;
  receiverAddress: Address;

  creditCardData: CreditCard;

  frequency: Frequency;
  deliveryWeekDay: WeekDaysName;

  scheduledDeliveryDate: Date;
  deliveryDate: Date | null;
  paymentDate: Date | null;

  values: InvoiceValues;

  items: Array<InvoiceProductData>;

  status: InvoiceStatus;

  createdAt: Date;
};

export const getStatus = (status: Invoice['status']): string => {
  switch (status) {
    case 'awaitingPayment':
      return 'Aguardando pagamento';

    case 'paymentAccept':
      return 'Pagamento aceito'

    case 'paymentFailed':
      return 'Pagamento falhou';

    case 'preparingForShipping':
      return 'Preparando para envio';

    case 'dispatched':
      return 'Enviado';

    case 'delivered':
      return 'Entregue';

    case 'returned':
      return 'O pedido retornou';

    case 'canceled':
      return 'Pedido cancelado';

    case 'finished':
      return 'Pedido finalizado';

    default:
      return 'Desconhecido';
  }
};

export const getFrequency = (frequency: Invoice['frequency']): string => {
  switch (frequency) {
    case 'all':
      return 'Primeiro pedido';

    case 'once':
      return 'Apenas uma vez'

    case 'weekly':
      return 'Semanal';

    case 'biweekly':
      return 'Quinzenal';

    case 'monthly':
      return 'Mensal';

    default:
      return 'Desconhecida';
  }
};