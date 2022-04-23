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

  public async get(id: Product['id']) {
    const product = await this.daoProduct.select(id as string);

    if (product === null)
      throw new Error("Produto inválido");
      
    return product;
  };
};

export default UCManagerProduct;