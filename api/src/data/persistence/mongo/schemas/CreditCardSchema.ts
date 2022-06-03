import mongoose from 'mongoose';
import CreditCard from '../../../../models/entities/CreditCard';

const creditCardSchema = new mongoose.Schema<CreditCard>({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'O id do cliente é obrigatório'],
  },

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

  cardHash: {
    type: String
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

var CreditCardSchema = mongoose.model('CreditCard', creditCardSchema);

export default CreditCardSchema;