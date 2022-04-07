import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Client from '../entities/Client';
import DAOClient from '../../persistence/mongo/dao/DAOClient';

class UCManagerClient {
  client: Client;
  daoClient: DAOClient;

  constructor(client: Client, daoClient: DAOClient) {
    this.client = client;
    this.daoClient = daoClient;
  };

  public async register() {
    // Test new client
    let sameCPF = await this.daoClient.selectBy({ email: this.client.cpf });
    let sameEmail = await this.daoClient.selectBy({ email: this.client.email });
    let sameCellPhone = await this.daoClient.selectBy({ email: this.client.email });

    if (sameCPF.length > 0)
      throw new Error("Já existe um cliente cadastrado com esse CPF");

    if (sameEmail.length > 0)
      throw new Error("Já existe um cliente cadastrado com esse e-mail");

    if (sameCellPhone.length > 0)
      throw new Error("Já existe um cliente cadastrado com este celular");

    // Create password hash
    this.client.password = await bcrypt.hash(this.client.password, 10);

    let newClient = await this.daoClient.save(this.client);

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

  public async login() {
    if (!(this.client.email && this.client.password))
      throw new Error("Dados de login incompleto");

    const clients = await this.daoClient.selectBy({ email: this.client.email });

    if (clients.length === 1 && (await bcrypt.compare(this.client.password, clients[0].password))) {
      this.client = clients[0];

      // Create token
      const token = jwt.sign(
        { client_id: this.client.id, email: this.client.email },
        process.env.TOKEN_KEY!,
        {
          expiresIn: process.env.CLIENT_TOKEN_DURATION!,
        }
      );

      this.client.token = token;

      this.daoClient.saveOrUpdate(this.client);

      return this.client;
    } else {
      throw new Error("Dados de login inválidos");
    };
  };

  public async logout() {
    const clients = await this.daoClient.selectBy({ token: this.client.token });

    if (clients.length !== 1)
      throw new Error("Token inválido");

    this.client = clients[1];

    this.client.token = jwt.sign(
      { client_id: this.client.id, email: this.client.email },
      process.env.TOKEN_KEY!,
      {
        expiresIn: 1,
      }
    );

    this.daoClient.saveOrUpdate(this.client);
  };
};

export default UCManagerClient;