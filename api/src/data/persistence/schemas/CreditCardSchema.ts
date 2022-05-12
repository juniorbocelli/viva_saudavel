import mongoose from 'mongoose';
import CreditCard from '../../../models/entities/CreditCard';

const creditCardSchema = new mongoose.Schema<CreditCard>({
  clientId: {
    type: String,
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
  expiryDate: {
    type: Date,
    required: [true, 'A data de vencimento do cartão é obrigatória'],
  },
  cvv: {
    type: String,
    required: [true, 'O código cvv do cartão é obrigatório'],
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