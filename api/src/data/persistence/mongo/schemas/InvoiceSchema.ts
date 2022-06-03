import mongoose from 'mongoose';
import Invoice from '../../../../models/entities/Invoice';

const invoiceSchema = new mongoose.Schema<Invoice>({
  checkout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checkout',
    required: [true, 'O id do checkout é obrigatório'],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
  },
  receiverData: {
    name: {
      type: String,
      required: [true, 'O nome do destinatário é obrigatório'],
    },
    cpf: {
      type: String,
      required: [true, 'O CPF do destinatário é obrigatório'],
    },
    email: {
      type: String,
      required: [true, 'O email do destinatário é obrigatório'],
    },
    cellPhone: {
      type: String,
      required: [true, 'O celular do destinatário é obrigatório'],
    },
  },

  receiverAddress: {
    cep: {
      type: String,
      required: [true, 'O CEP é obrigatório'],
    },
    street: {
      type: String,
      required: [true, 'O logradouro é obrigatório'],
    },
    district: {
      type: String,
      required: [true, 'O logradouro é obrigatório'],
    },
    state: {
      type: String,
      required: [true, 'O estado é obrigatório'],
    },
    city: {
      type: String,
      required: [true, 'A cidade é obrigatória'],
    },
    number: {
      type: String,
      required: [true, 'O número é obrigatório'],
    },
    complement: {
      type: String,
    },
  },

  creditCardData: {
    brand: {
      type: String,
      required: [true, 'A bandeira do cartão é obrigatória'],
    },
    name: {
      type: String,
      required: [true, 'O nome do cartão é obrigatória'],
    },
    number: [String],
    expiry: {
      type: Date,
      required: [true, 'A data de vencimento do cartão é obrigatória'],
    },
    cvc: {
      type: String,
      required: [true, 'O código cvc do cartão é obrigatório'],
    },
  },

  frequency: {
    type: String,
    enum: {
      values: ['all', 'once', 'weekly', 'biweekly', 'monthly'],
      message: 'O valor {VALUE} é inválido',
    },
    required: [true, 'A frequência do produto é obrigatória'],
  },
  deliveryWeekDay: {
    type: String,
    enum: {
      values: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      message: 'O valor {VALUE} é inválido',
    },
    required: [true, 'O dia de entrega obrigatório'],
  },

  scheduledDeliveryDate: {
    type: Date,
    required: [true, 'A previsão de entrega é obrigatória'],
  },
  deliveryDate: {
    type: Date,
    default: null,
  },
  paymentDate: {
    type: Date,
    default: null,
  },

  values: {
    productsValue: {
      type: Number,
      required: [true, 'O valor dos produtos é obrigatório'],
    },
    shippingValue: {
      type: Number,
      required: [true, 'O valor do frete é obrigatório'],
    },
    discounts: {
      type: Number,
      required: [true, 'O valor dos descontos é obrigatório'],
      default: 0,
    },
    totalValue: {
      type: Number,
      required: [true, 'O valor total é obrigatório'],
    },
  },

  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },

      name: {
        type: String,
        required: [true, 'O nome do produto é obrigatório'],
      },
      producer: {
        type: String,
        required: [true, 'O fabricante do produto é obrigatório'],
      },
      measure: {
        type: String,
        required: [true, 'A medida do produto é obrigatória'],
      },
      description: {
        type: String,
        required: [true, 'A descrição do produto é obrigatória'],
      },
      ingredients: {
        type: String,
        required: [true, 'Os ingredientes do produto são obrigatórios'],
      },
      validate: {
        type: String,
        required: [true, 'A validade do produto é obrigatória'],
      },
      thumb: {
        type: String,
        required: [true, 'A miniatura do produto é obrigatória'],
      },

      price: {
        type: Number,
        required: [true, 'O preço do produto é obrigatório'],
      },
    }
  ],

  status: {
    type: String,
    enum: {
      values: ['awaitingPayment', 'paymentAccept', 'paymentFailed', 'preparingForShipping', 'dispatched', 'delivered', 'returned', 'canceled'],
      message: 'O valor {VALUE} é inválido',
    },
    required: [true, 'O dia de entrega obrigatório'],
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var InvoiceSchema = mongoose.model('Invoice', invoiceSchema);

export default InvoiceSchema;