import mongoose from 'mongoose';
import Checkout from '../../../../models/entities/Checkout';

const checkoutSchema = new mongoose.Schema<Checkout>({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
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

  deliveryDay: {
    type: String,
    enum: {
      values: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      message: 'O valor {VALUE} é inválido',
    },
    required: [true, 'O dia de entrega obrigatório'],
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

var CheckoutSchema = mongoose.model('Checkout', checkoutSchema);

export default CheckoutSchema;