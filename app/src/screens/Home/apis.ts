import { getProductsAPI } from '../../services/products';
import { Product, ProductCard } from '../../globals/interfaces/product';
import { IUseStates } from './states';
import MaskApply from '../../features/utils/MaskApply';

export interface IUseAPIs {
  getProducts: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getProducts = () => {
    states.setIsQueryingAPI(true);

    getProductsAPI()
      .then((response) => {
        console.log('response => getProductsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const allProducts: Array<Product> = response.data.products;
        let leitesEDerivados: Array<ProductCard> = [];
        let queijos: Array<ProductCard> = [];
        let frios: Array<ProductCard> = [];
        let hortifruti: Array<ProductCard> = [];
        let bebidas: Array<ProductCard> = [];
        let docesEGeleias: Array<ProductCard> = [];

        allProducts.forEach(product => {
          let card: ProductCard = {
            id: product.id!,
            name: product.name,
            producer: product.producer,
            price: MaskApply.maskMoney(product.price),
            thumb: product.thumb!,
          };

          switch (product.filters.category) {
            case 'leite-e-derivados':
              leitesEDerivados.push(card);
              break;

            case 'queijos':
              queijos.push(card);
              break;

            case 'frios':
              frios.push(card);
              break;

            case 'hortifruti':
              hortifruti.push(card);
              break;

            case 'bebidas':
              bebidas.push(card);
              break;

            case 'doces-e-geleias':
              docesEGeleias.push(card);
              break;

            default:
              break;
          };
        });

        states.setLeiteEDerivados(leitesEDerivados);
        states.setQueijos(queijos);
        states.setFrios(frios);
        states.setHortifruti(hortifruti);
        states.setBebidas(bebidas);
        states.setDocesEGeleias(docesEGeleias);
      })
      .catch((error) => {
        console.log('error => getProductsAPI', error);

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
    getProducts,
  };
};

