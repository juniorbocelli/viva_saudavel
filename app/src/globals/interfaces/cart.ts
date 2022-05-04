export interface CartItem {
  productId: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  
  name: string;
  price: number;
  thumb: string;
};

export interface CartItemContainer extends CartItem {
  quantity: number;
};