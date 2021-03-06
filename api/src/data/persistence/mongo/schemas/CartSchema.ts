import mongoose from 'mongoose';
import Cart from '../../../../models/entities/Cart';

const cartSchema = new mongoose.Schema<Cart>({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
  },
  clientId: {
    type: String,
    required: [true, 'O id do cliente é obrigatório'],
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  items: [
    {
      product: {
        type: String,
        required: [true, 'O id do produto é obrigatório'],
      },
      frequency: {
        type: String,
        enum: {
          values: ['once', 'weekly', 'biweekly', 'monthly'],
          message: 'O valor {VALUE} é inválido',
        },
        required: [true, 'A frequência do produto é obrigatória'],
      },
    },
  ],
});

var CartSchema = mongoose.model('Cart', cartSchema);

export default CartSchema;