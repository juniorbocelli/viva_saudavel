import SanitizerString from '../utils/SanitizerString';

class ProductFilter {
  isKosher: boolean;
  isA2A2: boolean;
  isGlutenFree: boolean;
  isSugarFree: boolean;
  isNatural: boolean;
  isLactoseFree: boolean;

  producerCode: string;
  category: string;

  constructor(isKosher: boolean, isA2A2: boolean, isGlutenFree: boolean, isSugarFree: boolean, isNatural: boolean, isLactoseFree: boolean, producerCode: string, category: string) {
    this.isKosher = isKosher;
    this.isA2A2 = isA2A2;
    this.isGlutenFree = isGlutenFree;
    this.isSugarFree = isSugarFree;
    this.isNatural = isNatural;
    this.isLactoseFree = isLactoseFree;

    this.producerCode = SanitizerString.removeSpaces(producerCode);
    this.category = SanitizerString.removeSpaces(category);
  };
};

export default ProductFilter;