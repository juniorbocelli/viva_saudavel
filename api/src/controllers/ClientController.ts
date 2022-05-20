import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Client from '../models/entities/Client';
import Address from '../models/entities/Address';
import DAOClient from '../data/persistence/mongo/dao/DAOClient';
import UCManagerClient from '../models/useCases/UCManagerClient';

class ClientController {
  static async register(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const { name, cpf, email, cellPhone, phone, password, address } = req.body;

    try {
      const clientAddress = new Address(address.cep, address.street, address.district, address.state, address.city, address.number, address.complement);

      const client = Client.getNew(name, cpf, email, cellPhone, phone, clientAddress, password);
      const ucManagerClient = new UCManagerClient(daoClient);

      res.status(200).json({ client: await ucManagerClient.register(client) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async login(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const { email, password, } = req.body;

    if (!(email && password)) {
      res.status(400).send({ error: "Dados de login incompletos" });

      return;
    };

    try {
      const ucManagerClient = new UCManagerClient(daoClient);

      res.status(200).json({ client: await ucManagerClient.login(email, password) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getLoggedClient(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const token = req.params.token;

    try {
      const client = await daoClient.selectBy({ token: token });

      // Verify if client exist
      if (client.length !== 1) {
        res.status(401).json({ error: "Token inválido" });

        return;
      };

      // Verify if token is valid
      jwt.verify(token, process.env.TOKEN_KEY!);

      res.status(200).json({ client: client[0] });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    };
  };

  static async logout(req: Request, res: Response) {
    try {
      const token = req.headers["x-access-token"];

      // Verify if token is valid
      jwt.verify(token as string, process.env.TOKEN_KEY!);
      const daoClient = new DAOClient();

      const ucManagerClient = new UCManagerClient(daoClient);

      ucManagerClient.logout(token as string);

      res.status(200).json({ message: "Logout realizado" });

    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async get(req: Request, res: Response) {
    const { id } = req.params;
    const daoClient = new DAOClient();

    try {
      const ucManagerClient = new UCManagerClient(daoClient);

      const clientToSend = await ucManagerClient.getById(id);

      res.status(200).json({ client: clientToSend });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async update(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const ucManagerClient = new UCManagerClient(daoClient);

    const { id } = req.params;
    const token = req.headers["x-access-token"];
    const { address } = req.body;

    try {
      const newClientData = req.body as Client;
      const previousClient = await ucManagerClient.getById(id);

      newClientData.address = new Address(address.cep, address.street, address.district, address.state, address.city, address.number, address.complement);
      const updatedClient = Client.getUpdated(newClientData, previousClient);

      const loggedClient = await ucManagerClient.getByToken(token as string)

      // Verify ids
      if (updatedClient.id !== loggedClient.id && !loggedClient.isAdmin) {
        res.status(200).json({ error: "Você não tem autorização para realizar essa operação" });
        ucManagerClient.logout(token as string);

        return;
      };

      res.status(200).json({ client: await ucManagerClient.update(updatedClient) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAll(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const ucManagerClient = new UCManagerClient(daoClient);

    try {
      res.status(200).json({ clients: await ucManagerClient.getAll() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ClientController;