class Math {
  public static currencyToFloat(c: string | number): number {
    if (typeof (c) === 'number')
      return c;

    let number = parseFloat(c.replace(/[r$\s.]/gi, '').replace(',', '.'));
    if (typeof(number) !== 'number')
      throw new Error("Erro ao tentar converter moeda para numero Real");

    return number;
  };

  public static floatOrUndefined(c: string | number): number | undefined {
    let number: number;

    if (typeof (c) === 'number')
      return c;

    if (toString.call(c) !== '[object String]')
      return undefined;

    try {
      number = this.currencyToFloat(c)
    } catch (error: any) {
      return undefined
    };

    return number;
  };
};

export default Math;