import Product from '../entities/Product';
import DAOProduct from '../../persistence/mongo/dao/DAOProduct';

class UCManagerProduct {
  daoProduct: DAOProduct;

  constructor(daoProduct: DAOProduct) {
    this.daoProduct = daoProduct;
  };

  public async new(product: Product) {
    // Test name product
    let sameName = await this.daoProduct.selectBy({ name: product.name, isActive: true });

    if (sameName.length > 0)
      throw new Error("Já existe um produto ativo com este nome");

    let newProduct = await this.daoProduct.save(product);

    return await newProduct.save();
  };

  //   public async login(email: Client['email'], password: Client['password']) {
  //     if (!(email && password))
  //       throw new Error("Dados de login incompleto");

  //     const clients = await this.daoClient.selectBy({ email: email });

  //     if (clients.length === 1 && (await bcrypt.compare(password, clients[0].password as string))) {
  //       const client = clients[0];

  //       // Verify if client is desactived
  //       if (!client.isActive)
  //         throw new Error("Cliente bloqueado");

  //       // Create token
  //       const token = jwt.sign(
  //         { client_id: client.id, email: client.email },
  //         process.env.TOKEN_KEY!,
  //         {
  //           expiresIn: process.env.CLIENT_TOKEN_DURATION!,
  //         }
  //       );

  //       client.token = token;

  //       this.daoClient.update(client);

  //       return client;
  //     } else {
  //       throw new Error("Dados de login inválidos");
  //     };
  //   };

  //   public async logout(token: Client['token']) {
  //     const clients = await this.daoClient.selectBy({ token: token });

  //     if (clients.length !== 1)
  //       throw new Error("Token inválido");

  //     const client = clients[0];

  //     client.token = jwt.sign(
  //       { client_id: client.id, email: client.email },
  //       process.env.TOKEN_KEY!,
  //       {
  //         expiresIn: 1,
  //       }
  //     );

  //     this.daoClient.update(client);
  //   };

  //   public async getById(id: Client['id']) {
  //     if (typeof (id) === 'undefined')
  //       throw new Error("Cliente inválido");

  //     const clientData = await this.daoClient.select(id.toString());

  //     if (clientData === null)
  //       throw new Error("Cliente inválido");

  //     const client = clientData;

  //     return client;
  //   };

  //   public async getByToken(token: Client['token']) {
  //     if (typeof (token) === 'undefined')
  //       throw new Error("Cliente inválido");

  //     const clients = await this.daoClient.selectBy({ token: token });

  //     if (clients.length !== 1)
  //       throw new Error("Cliente inválido");

  //     const client = clients[0];

  //     return client;
  //   };

  //   public async update(client: Client) {
  //     const clientToUpdate = await this.getById(client.id?.toString());

  //     if (typeof (client.password) !== 'undefined')
  //       client.password = await bcrypt.hash(client.password as string, 10);
  //     else
  //       client.password = clientToUpdate.password;

  //     return await this.daoClient.update(client);
  //   };
};

export default UCManagerProduct;