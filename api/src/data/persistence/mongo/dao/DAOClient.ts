import mongoose from 'mongoose';

import DAO from '../../../utils/DAO';
import ClientSchema from '../../schemas/ClientSchema';
import Client from '../../../../models/entities/Client';

class DAOClient implements DAO<Client, string> {
  isValidObjectId(client: Client | string): boolean {

    if (client instanceof Client)
      if (client.id !== null)
        return mongoose.Types.ObjectId.isValid(client.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(client);
  };

  async save(client: Client) {
    let clientSchema: Client & mongoose.Document<any, any, Client>;

    clientSchema = new ClientSchema({
      name: client.name,
      cpf: client.cpf,

      email: client.email,
      cellPhone: client.cellPhone,
      phone: client.phone,

      address: client.address,
      creditCards: client.creditCards,
      cart: client.cart,

      password: client.password,
      token: client.token,

      createdAt: client.createdAt,
      isActive: client.isActive,
      isAdmin: client.isAdmin,
    });
    await clientSchema.save();

    client.id = clientSchema._id;

    return clientSchema;
  };

  async update(client: Client) {
    if (!this.isValidObjectId(client))
      throw 'O id do usuário é inválido';

    const foundedClient = await ClientSchema.findById(client.id);

    if (foundedClient === null)
      throw 'Usuário inválido'

    const updatedClientData = {
      name: client.name,
      cpf: foundedClient.cpf,

      email: client.email,
      cellPhone: client.cellPhone,
      phone: client.phone || foundedClient.phone,

      address: client.address || foundedClient.address,
      creditCards: client.creditCards || foundedClient.creditCards,
      cart: client.cart || foundedClient.cart,

      password: client.password || foundedClient.password,
      token: client.token || foundedClient.token,

      createdAt: foundedClient.createdAt,
      isActive: client.isActive,
      isAdmin: client.isAdmin,
    };

    return await ClientSchema.findByIdAndUpdate(client.id, updatedClientData, { new: true });
  };

  async saveOrUpdate(client: Client) {
    if (typeof (client.id) === "undefined") {
      return this.save(client);
    };

    if (!this.isValidObjectId(client))
      throw `O id do usuário é inválido`;

    const singleClient = await ClientSchema.findById(client.id);

    if (singleClient === null)
      return this.save(client);
    else
      return this.update(client);
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
    const foundedClient = await ClientSchema.findById(id);

    if (foundedClient === null)
      return null;

    return Client.fromObject(foundedClient);
  };

  async selectAll(): Promise<Array<Client>> {
    const clients = await ClientSchema.find();
    let clientsToReturn: Array<Client> = [];

    clients.forEach((client) => {
      clientsToReturn.push(Client.fromObject(client));
    });
    return clientsToReturn;
  };

  async selectBy(query: Object): Promise<Array<Client>> {
    const clients = await ClientSchema.find(query).exec();
    let clientsToReturn: Array<Client> = [];

    clients.forEach((client) => {
      clientsToReturn.push(Client.fromObject(client));
    });
    return clientsToReturn;
  };

  async populate(client: Client, fields: Array<string>): Promise<Client> {
    const foundedClient = await ClientSchema.findById(client.id);

    if (foundedClient === null)
      throw 'Cliente inválido'

    fields.forEach(field => {
      foundedClient.populate(field);
    });

    return Client.fromObject(foundedClient);
  };

  async selectAndPopulate(query: Object, fields: Array<string>): Promise<Array<Client>> {
    const clients = await ClientSchema.find(query).exec();

    let populatedClients = clients.map(client => {
      fields.forEach(field => {
        client.populate(field);
      });

      return client;
    });

    return populatedClients;
  };
};

export default DAOClient;