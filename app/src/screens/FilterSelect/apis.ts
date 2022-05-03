import { getProductsByFiltersAPI } from '../../services/products';
import { Product, ProductCard, FilterSearch } from '../../globals/interfaces/product';
import { IUseStates } from './states';
import MaskApply from '../../features/utils/MaskApply';
import { FilterCodes } from '../../globals/interfaces/product';

export interface IUseAPIs {
  getProductsByFilters: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getFilterCode = (filterName: FilterCodes): string => {
    switch (filterName) {
      case 'a2a2':
        return "isA2A2";

      case 'sem-gluten':
        return "isGlutenFree";

      case 'kosher':
        return "isKosher";

      case 'sem-lactose':
        return "isLactoseFree";

      case 'natural':
        return "isNatural";

      case 'sem-adicao-de-acucar':
        return "isSugarFree";

      default:
        return "default";
    };
  };

  const getProductsByFilters = () => {
    states.setIsQueryingAPI(true);
    
    getProductsByFiltersAPI({ [getFilterCode(states.selectedFilter as FilterCodes)]: true as FilterSearch })
      .then((response) => {
        console.log('response => getProductsByFiltersAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const allProducts: Array<Product> = response.data.products;
        let cards: Array<ProductCard> = [];

        allProducts.forEach(product => {
          let card: ProductCard = {
            id: product.id!,
            name: product.name,
            producer: product.producer,
            price: MaskApply.maskMoney(product.price),
            thumb: product.thumb!,
          };

          cards.push(card);
        });

        states.setCards(cards);
      })
      .catch((error) => {
        console.log('error => getProductsByFiltersAPI', error);

        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar buscar produtos" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getProductsByFilters,
  };
};

