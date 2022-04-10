import mongoose from 'mongoose';

class Basket {
  id: Array<mongoose.Types.ObjectId | string>;
  client: Array<mongoose.Types.ObjectId | string>;

  frequency: 'weekly' | 'biweekly' | 'monthly';
  products: Array<mongoose.Types.ObjectId | string>;
  createdAt: Date;
  isActive: Boolean;

  constructor(id: Basket['id'], client: Basket['client'], frequency: Basket['frequency'], products: Basket['products'] | undefined, createdAt: Basket['createdAt'] | undefined, isActive: Basket['isActive'] | undefined) {
    this.id = id;
    this.client = client;
    
    this.frequency = frequency;
    this.products = products || [];

    this.createdAt = createdAt || new Date();
    this.isActive = isActive || true;
  };
};

export default Basket;