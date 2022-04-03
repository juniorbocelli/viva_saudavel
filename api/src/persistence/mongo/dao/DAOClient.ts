import mongoose from 'mongoose';

import DAO from '../../utils/DAO';
import ClientSchema from '../schemas/ClientSchema';
import Client from '../../../models/entities/Client';

class DAOPost implements DAO<Client, string> {
  isValidObjectId(client: Client | string): boolean {

    if (client instanceof Client)
      if (typeof (client.id) !== "undefined")
        return mongoose.Types.ObjectId.isValid(client.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(client);
  };

  async save(client: Client) {
    let clientSchema: Client & mongoose.Document<any, any, Client>;

    if (typeof (client.id) === "undefined") {
      clientSchema = new ClientSchema({
        name: client.name,
        cpf: client.cpf,

        email: client.email,
        cellPhone: client.cellPhone,
        phone: client.phone,

        password: client.password,

        createdAt: client.createdAt,
        isActive: client.isActive,
      });
    } else {
      if (!this.isValidObjectId(client))
        throw `O id do cliente é inválido`;

      clientSchema = new ClientSchema({
        name: client.name,
        cpf: client.cpf,

        email: client.email,
        cellPhone: client.cellPhone,
        phone: client.phone,

        password: client.password,

        createdAt: client.createdAt,
        isActive: client.isActive,

        _id: client.id,
      });
    };

    await clientSchema.save();

    client.id = clientSchema._id;
  };

  async update(client: Client) {
    if (!this.isValidObjectId(client))
      throw 'O id do usuário é inválido';

    const foundedClient = await ClientSchema.findById(client.id);

    const updatedClient = {
      name: client.name,
      cpf: client.cpf,

      email: client.email,
      cellPhone: client.cellPhone,
      phone: client.phone || foundedClient?.phone,

      password: client.password,

      createdAt: client.createdAt || foundedClient?.createdAt,
      isActive: client.isActive || foundedClient?.isActive,

      _id: client.id,
    };

    await ClientSchema.findByIdAndUpdate(client.id, updatedClient, { new: true });
  };

  async saveOrUpdate(client: Client) {
    if (typeof (client.id) === "undefined") {
      this.save(client);
      return;
    };

    if (!this.isValidObjectId(client))
      throw `O id do usuário é inválido`;

    const singleClient = await ClientSchema.findById(client.id);

    if (singleClient === null)
      this.save(client);
    else
      this.update(client);
  };

  async saveOrUpdateWithReturnId(client: Client): Promise<string> {
    await this.saveOrUpdate(client);

    return client.id!?.toString();
  };

  async delete(id: string) {
    if (!this.isValidObjectId(id))
      throw `O id do usuário é inválido`;

    await ClientSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Client | null> {
    const client = await ClientSchema.findById(id);

    if (client === null)
      return null;

    return new Client(client.id, client.name, client.cpf, client.email, client.cellPhone, client.phone, client.password, client.createdAt, client.isActive);
  };

  async selectAll(): Promise<Array<Client>> {
    const clients = await ClientSchema.find();
    let clientsToReturn: Array<Client> = [];

    clients.forEach((client) => {
      clientsToReturn.push(new Client(client.id, client.name, client.cpf, client.email, client.cellPhone, client.phone, client.password, client.createdAt, client.isActive));
    });
    return clientsToReturn;
  };
};

export default DAOPost;