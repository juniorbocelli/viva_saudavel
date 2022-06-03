import mongoose from 'mongoose';
import Client from '../../../../models/entities/Client';

const clientSchema = new mongoose.Schema<Client>({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
  },
  cpf: {
    type: String,
    required: [true, 'O CPF é obrigatório'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
  },
  cellPhone: {
    type: String,
    required: [true, 'O celular é obrigatório'],
    unique: true,
  },
  phone: {
    type: String,
  },

  address: {
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

  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
  },
  token: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, 'Problema ao cadastrar cliente'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: [true, 'Problema ao cadastrar cliente'],
  },
});

var ClientSchema = mongoose.model("Client", clientSchema);

export default ClientSchema;