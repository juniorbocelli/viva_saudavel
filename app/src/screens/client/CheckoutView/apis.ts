import { getShippingValueByCepAPI } from '../../../services/shipping';
import { getDeliveryDateAPI, getCheckoutClientAPI } from '../../../services/checkout';
import { getCreditCardByFilterAPI } from '../../../services/creditCard';

import { IUseStates } from './states';
import { Checkout, CheckoutAPI } from '../../../globals/interfaces/checkout';
import { WeekDaysName } from '../../../globals/interfaces/dateTime';
import { CreditCard } from '../../../globals/interfaces/creditCard';

import Math from '../../../features/utils/Math';
import { CartItemAPI } from '../../../globals/interfaces/cart';
import { Product } from '../../../globals/interfaces/product';

export interface IUseAPIs {
  getShippingValueByCep: (destinationCep: string) => void;
  getDeliveryDate: (weekDay: WeekDaysName) => void;
  getActiveCreditCard: (clientId: string) => void;

  getCheckoutClient: (clientId: string, id: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getShippingValueByCep = (destinationCep: string) => {
    states.setIsQueryingAPI(true);

    getShippingValueByCepAPI(destinationCep)
      .then((response) => {
        console.log('response => getShippingValueByCepAPI', response);
        states.setShippingValue(Math.currencyToFloat(response.data.shippingValue));

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error) => {
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getDeliveryDate = (weekDay: WeekDaysName) => {
    states.setIsQueryingAPI(true);

    getDeliveryDateAPI(weekDay)
      .then((response) => {
        console.log('response => getDeliveryDateAPI', response);
        states.setDeliveryDay(response.data.firstDelivery);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error) => {
        console.log('error => getDeliveryDateAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getActiveCreditCard = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getCreditCardByFilterAPI(clientId, { isActive: true, decrypt: false })
      .then((response) => {
        console.log('response => getCreditCardByFilterAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const creditCards: Array<CreditCard> = response.data.creditCards;

        if (creditCards.length > 0) {
          states.setActiveCreditCard({
            lastNumber: creditCards[0].number[creditCards[0].number.length - 1],
            brand: creditCards[0].brand,
            expiry: new Date(creditCards[0].expiry),
          });
        } else {
          states.setActiveCreditCard(null);
        };

      })
      .catch((error) => {
        console.log('error => getCreditCardByFilterAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });

      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getCheckoutClient = (clientId: string, id: string) => {
    states.setIsQueryingAPI(true);

    getCheckoutClientAPI(clientId, id)
      .then((response) => {
        console.log('response => getCheckoutClientAPI', response);
        states.setDeliveryDay(response.data.firstDelivery);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        // Get checkout
        const checkout: CheckoutAPI = response.data.checkout;
        states.setCheckout(checkout);

        const allItems: Array<CartItemAPI> = response.data.checkout.items;

        allItems.forEach(item => {
          let product: Product = item.product as Product;

          switch (item.frequency) {
            case 'once':
              states.setOnceItems(items => [...items, product]);
              states.setPrices(prices => ({ ...prices, once: prices.once + product.price }));
              break;

            case 'weekly':
              states.setWeeklyItems(items => [...items, product]);
              states.setPrices(prices => ({ ...prices, weekly: prices.weekly + product.price }));
              break;

            case 'biweekly':
              states.setBiweeklyItems(items => [...items, product]);
              states.setPrices(prices => ({ ...prices, biweekly: prices.biweekly + product.price }));
              break;

            case 'monthly':
              states.setMonthlyItems(items => [...items, product]);
              states.setPrices(prices => ({ ...prices, monthly: prices.monthly + product.price }));
              break;
          };
        });
      })
      .catch((error) => {
        console.log('error => getCheckoutClientAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getShippingValueByCep,
    getDeliveryDate,
    getActiveCreditCard,

    getCheckoutClient,
  };
};