import crypto from 'crypto';

class StoragedValues {
  private static instance: StoragedValues;

  private constructor() { };

  public static getInstance(): StoragedValues {
    if (!StoragedValues.instance) {
      StoragedValues.instance = new StoragedValues();
    };

    return StoragedValues.instance;
  };

  /**
   * Set values
   */

  public setToken(s: string): void {
    localStorage.setItem('auth', s);
  };

  private setCartKey(): void {
    localStorage.setItem('cart_key', this.getDefaultCartKey());
  };


  /**
   * Get values
   */

  public getToken(): string {
    if (!localStorage.getItem('auth'))
      this.setToken(this.getDefaultToken());

    return localStorage.getItem('auth') || this.getDefaultToken();
  };

  public getCartKey(): string {
    if (!localStorage.getItem('cart_key'))
      this.setCartKey();

  return localStorage.getItem('cart_key') || this.getDefaultCartKey();
  };


  /**
   * Default values
   */
  public getDefaultToken(): string {
    return 'not_auth';
  };

  private getDefaultCartKey(): string {
    return crypto.randomBytes(16).toString('hex');
  }
};

export default StoragedValues.getInstance();
