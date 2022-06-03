import mongoose from 'mongoose';
import Product from '../../../../models/entities/Product';

const productSchema = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
  },
  producer: {
    type: String,
    required: [true, 'O produtor é obrigatório'],
  },
  measure: {
    type: String,
    required: [true, 'A medida é obrigatória'],
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
  },
  ingredients: {
    type: String,
    required: [true, 'Os ingredientes são obrigatório'],
  },
  validate: {
    type: String,
    required: [true, 'A validade é obrigatória'],
  },

  filters: {
    isKosher: {
      type: Boolean,
      required: [true, 'O campo é kosher é obrigatório'],
    },
    isA2A2: {
      type: Boolean,
      required: [true, 'O campo é A2A2 é obrigatório'],
    },
    isGlutenFree: {
      type: Boolean,
      required: [true, 'O campo é sem glúten é obrigatório'],
    },
    isSugarFree: {
      type: Boolean,
      required: [true, 'O campo é sem açúcar é obrigatório'],
    },
    isNatural: {
      type: Boolean,
      required: [true, 'O campo é natural é obrigatório'],
    },
    isLactoseFree: {
      type: Boolean,
      required: [true, 'O campo é semlactose é obrigatório'],
    },

    producerCode: {
      type: String,
      required: [true, 'O código do produtor é obrigatório'],
    },
    category: {
      type: String,
      required: [true, 'O código da categoria é obrigatório'],
    },
  },

  price: {
    type: Number,
    required: [true, 'O preço é obrigatório'],
    default: 0.00,
  },
  images: {
    type: [String],
    required: [true, 'É obrigatório enviar imagens'],
    default: [],
  },
  thumb: {
    type: String,
    required: [true, 'A miniatura da imagem é obrigatória'],
  },

  isActive: {
    type: Boolean,
    required: [true, 'O campo está ativo é obrigatório'],
    default: true,
  },
  quantity: {
    type: Number,
    required: [true, 'A quantidade é obrigatória'],
    default: null,
  },
  createdAt: {
    type: Date,
    required: [true, 'O campo data de cadastro é obrigatório'],
    default: new Date(),
  },
});

var ProductSchema = mongoose.model('Product', productSchema);

export default ProductSchema;