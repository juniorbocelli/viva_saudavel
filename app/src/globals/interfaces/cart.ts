export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  quantity: number;
};