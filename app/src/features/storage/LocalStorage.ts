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
   * Filtros da Lista de empresas
   * @returns 
   */

  public getToken(): string {
    if (!localStorage.getItem('auth')) localStorage.setItem('auth', this.defaultToken());

    return localStorage.getItem('auth') || this.defaultToken();
  };

  public setToken(s: string): void {
    localStorage.setItem('auth', s);
  };
  

  // Valores padrão

  /**
   * Filtros da Lista de Empresas
   * @returns 
   */
  private defaultToken(): string {
    return 'not_auth';
  };
};

export default StoragedValues.getInstance();
