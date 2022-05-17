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
    let sameNumber = await this.daoCreditCard.selectBy({ cardHash: creditCard.cardHash });

    if (sameNumber.length > 0)
      throw new Error("Já existe um cartão com este número");

    return this.daoCreditCard.save(creditCard);
  };

  public async get(id: CreditCard['id'], clientId: CreditCard['clientId']) {
    // Verify if exist
    const creditCards = await this.daoCreditCard.selectBy({ _id: id, clientId: clientId });

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
    let sameNumber = await this.daoCreditCard.selectBy({ cardHash: creditCard.cardHash });

    if (sameNumber.length > 0)
      if (sameNumber[0].id?.toString() !== creditCard.id)
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
    await this.get(id, clientId);

    const others = await this.daoCreditCard.selectBy({ clientId: clientId });

    others.forEach(creditCard => {
      if (creditCard.id?.valueOf() !== id?.valueOf())
        creditCard.isActive = false;
      else
        creditCard.isActive = true;

      this.daoCreditCard.update(creditCard);
    });

    return this.get(id, clientId);
  };

  public async remove(id: string) {
    // Verify if exist
    const cardToremove = await this.daoCreditCard.select(id);

    if (cardToremove === null)
      throw new Error("Cartão inválido");

    this.daoCreditCard.delete(cardToremove.id as string);

    return cardToremove;
  };
};

export default UCManagerCreditCard;