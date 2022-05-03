import { getProductsByFiltersAPI } from '../../services/products';
import { Product, ProductCard, FilterSearch } from '../../globals/interfaces/product';
import { IUseStates } from './states';
import MaskApply from '../../features/utils/MaskApply';

export interface IUseAPIs {
  getProductsByFilters: (filter: FilterSearch) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getProductsByFilters = (filter: FilterSearch) => {
    states.setIsQueryingAPI(true);

    getProductsByFiltersAPI(filter)
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

