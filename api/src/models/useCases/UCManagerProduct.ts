import Product from '../entities/Product';
import DAOProduct from '../../data/persistence/mongo/dao/DAOProduct';

class UCManagerProduct {
  private daoProduct: DAOProduct;

  constructor(daoProduct: DAOProduct) {
    this.daoProduct = daoProduct;
  };

  public async new(product: Product) {
    // Test name product
    let sameName = await this.daoProduct.selectBy({ name: product.name, isActive: true });

    if (sameName.length > 0)
      throw new Error("Já existe um produto ativo com este nome");

    let newProduct = await this.daoProduct.save(product);

    return newProduct;
  };

  public async get(id: string) {
    const product = await this.daoProduct.select(id as string);

    if (product === null)
      throw new Error("Produto inválido");

    return product;
  };

  public async update(product: Product) {
    // Test name product
    let sameName = await this.daoProduct.selectBy({ name: product.name, isActive: true });

    if (sameName.length > 0 && sameName[0].id !== product.id)
      throw new Error("Já existe um produto ativo com este nome");

    return this.daoProduct.update(product);
  };

  public async getAll() {
    return await this.daoProduct.selectAll();
  };

  public async getByFilter(filters: Object) {
    return await this.daoProduct.selectBy(filters);
  };
};

export default UCManagerProduct;