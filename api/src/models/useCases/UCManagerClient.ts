import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Client from '../entities/Client';
import DAOClient from '../../data/persistence/mongo/dao/DAOClient';
import CreditCard from '../entities/CreditCard';

class UCManagerClient {
  private daoClient: DAOClient;

  constructor(daoClient: DAOClient) {
    this.daoClient = daoClient;
  };

  public async register(client: Client) {
    // Test new client
    let sameCPF = await this.daoClient.selectBy({ email: client.cpf });
    let sameEmail = await this.daoClient.selectBy({ email: client.email });
    let sameCellPhone = await this.daoClient.selectBy({ email: client.email });

    if (sameCPF.length > 0)
      throw new Error("Já existe um cliente cadastrado com esse CPF");

    if (sameEmail.length > 0)
      throw new Error("Já existe um cliente cadastrado com esse e-mail");

    if (sameCellPhone.length > 0)
      throw new Error("Já existe um cliente cadastrado com este celular");

    // Create password hash
    client.password = await bcrypt.hash(client.password as string, 10);

    let newClient = await this.daoClient.save(client);

    // Create token
    const token = jwt.sign(
      { client_id: newClient._id, email: newClient.email },
      process.env.TOKEN_KEY!,
      {
        expiresIn: process.env.CLIENT_TOKEN_DURATION!,
      }
    );

    newClient.token = token;

    newClient.save();

    return newClient;
  };

  public async login(email: Client['email'], password: Client['password']) {
    if (!(email && password))
      throw new Error("Dados de login incompleto");

    const clients = await this.daoClient.selectBy({ email: email });

    if (clients.length === 1 && (await bcrypt.compare(password, clients[0].password as string))) {
      const client = clients[0];

      // Verify if client is desactived
      if (!client.isActive)
        throw new Error("Cliente bloqueado");

      // Create token
      const token = jwt.sign(
        { client_id: client.id, email: client.email },
        process.env.TOKEN_KEY!,
        {
          expiresIn: process.env.CLIENT_TOKEN_DURATION!,
        }
      );

      client.token = token;

      this.daoClient.update(client);

      return client;
    } else {
      throw new Error("Dados de login inválidos");
    };
  };

  public async logout(token: Client['token']) {
    const clients = await this.daoClient.selectBy({ token: token });

    if (clients.length !== 1)
      throw new Error("Token inválido");

    const client = clients[0];

    client.token = jwt.sign(
      { client_id: client.id, email: client.email },
      process.env.TOKEN_KEY!,
      {
        expiresIn: 1,
      }
    );

    this.daoClient.update(client);
  };

  public async getById(id: Client['id']) {
    if (id === null)
      throw new Error("Cliente inválido");

    return await this.daoClient.select(id);;
  };

  public async getByToken(token: Client['token']) {
    if (typeof (token) === 'undefined')
      throw new Error("Cliente inválido");

    const clients = await this.daoClient.selectBy({ token: token });

    return clients[0];
  };

  public async update(client: Client) {
    if (client.id === null)
      throw new Error("Cliente inválido");

    const clientToUpdate = await this.getById(client.id.toString());

    if (clientToUpdate === null)
      throw new Error("Cliente inválido");

    if (client.password !== clientToUpdate.password)
      client.password = await bcrypt.hash(client.password as string, 10);

    return await this.daoClient.update(client);
  };

  public async getAll() {
    return await this.daoClient.selectAll();
  };

  public async getByFilter(filters: Object) {
    return await this.daoClient.selectBy(filters);
  };
};

export default UCManagerClient;