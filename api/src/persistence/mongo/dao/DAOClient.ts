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

    clientSchema = new ClientSchema({
      name: client.name,
      cpf: client.cpf,

      email: client.email,
      cellPhone: client.cellPhone,
      phone: client.phone,

      address: client.address,

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

      password: client.password || foundedClient.password,
      token: client.token || foundedClient.token,

      createdAt: client.createdAt,
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
    const client = await ClientSchema.findById(id);

    if (client === null)
      return null;

    return new Client(client.id, client.name, client.cpf, client.email, client.cellPhone, client.phone, client.address, client.password as string, client.token, client.createdAt, client.isActive, client.isAdmin);
  };

  async selectAll(): Promise<Array<Client>> {
    const clients = await ClientSchema.find();
    let clientsToReturn: Array<Client> = [];

    clients.forEach((client) => {
      clientsToReturn.push(new Client(client.id, client.name, client.cpf, client.email, client.cellPhone, client.phone, client.address, client.password as string, client.token, client.createdAt, client.isActive, client.isAdmin));
    });
    return clientsToReturn;
  };

  async selectBy(query: Object): Promise<Array<Client>> {
    const clients = await ClientSchema.find(query).exec();
    let clientsToReturn: Array<Client> = [];

    clients.forEach((client) => {
      clientsToReturn.push(new Client(client.id, client.name, client.cpf, client.email, client.cellPhone, client.phone, client.address, client.password as string, client.token, client.createdAt, client.isActive, client.isAdmin));
    });
    return clientsToReturn;
  };
};

export default DAOPost;