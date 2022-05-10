import CreditCard from '../entities/CreditCard';
import DAOCreditCard from '../../data/persistence/mongo/dao/DAOCreditCard';

class UCManagerCreditCard {
  private daoCreditCard: DAOCreditCard;

  constructor(daoCreditCard: DAOCreditCard) {
    this.daoCreditCard = daoCreditCard;
  };

  public async new(creditCard: CreditCard) {
    // Encrypt card
    creditCard.encryptCard();

    // Test card number
    let sameNumber = await this.daoCreditCard.selectBy({ number: creditCard.number });

    if (sameNumber.length > 0)
      throw new Error("Já existe um cartão com este número");

    return this.daoCreditCard.save(creditCard);
  };

  public async get(id: CreditCard['id'], clientId: CreditCard['clientId']) {
    // Verify if exist
    const creditCards = await this.daoCreditCard.selectBy({ id: id, clientId: clientId });

    if (creditCards.length === 0)
      throw new Error("Cartão não existe");

    return creditCards[0];
  };

  public async getByclientId(clientId: CreditCard['clientId']) {
    const creditCards = await this.daoCreditCard.selectBy({ clientId: clientId, isActive: true });

    if (creditCards.length === 0)
      throw new Error("O cliente não tem cartões ativos");

    return creditCards[0];
  };

  public async update(creditCard: CreditCard) {
    creditCard.encryptCard();

    // Test card number
    let sameNumber = await this.daoCreditCard.selectBy({ number: creditCard.number });

    if (sameNumber.length > 0 && sameNumber[0].id !== creditCard.id)
      throw new Error("Já existe um cartão com este número");

    return this.daoCreditCard.update(creditCard);
  };

  public async getAll() {
    return await this.daoCreditCard.selectAll();
  };

  public async getByFilter(filters: Object) {
    return await this.daoCreditCard.selectBy(filters);
  };

  public async inactiveOthers(id: CreditCard['id'], clientId: CreditCard['clientId']) {
    // Verify if exist
    const retainedCard = await this.get(id, clientId);

    const others = await this.daoCreditCard.selectBy({ clientId: clientId });

    others.forEach(creditCard => {
      if (creditCard.id?.toString() !== id) {
        creditCard.isActive = false;

        this.daoCreditCard.update(creditCard);
      };
    });

    retainedCard.isActive = true;

    return this.daoCreditCard.update(retainedCard);
  };
};

export default UCManagerCreditCard;