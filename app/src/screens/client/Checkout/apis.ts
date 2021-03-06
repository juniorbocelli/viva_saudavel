import { useNavigate } from 'react-router-dom';

import { getShippingValueByCepAPI } from '../../../services/shipping';
import { getDeliveryDateAPI, newCheckoutAPI } from '../../../services/checkout';
import { getCreditCardByFilterAPI } from '../../../services/creditCard';

import { IUseStates } from './states';
import { Checkout, CheckoutAPI } from '../../../globals/interfaces/checkout';
import { WeekDaysName } from '../../../globals/interfaces/dateTime';
import { CreditCard } from '../../../globals/interfaces/creditCard';

import { useGlobalContext } from '../../../features/globalContext/context';

import Math from '../../../features/utils/Math';

export interface IUseAPIs {
  getShippingValueByCep: (destinationCep: string) => void;
  getDeliveryDate: (weekDay: WeekDaysName) => void;
  getActiveCreditCard: (clientId: string) => void;
  newCheckout: (clientId: string, checkout: Checkout) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const navigate = useNavigate();
  const globalContext = useGlobalContext();

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

  const newCheckout = (clientId: string, checkout: Checkout) => {
    states.setIsQueryingAPI(true);

    let checkoutItemsAPI: CheckoutAPI['items'] = [];

    checkout.items.forEach(item => {
      checkoutItemsAPI.push({ frequency: item.frequency, product: item.productId });
    });

    const checkoutAPI: CheckoutAPI = {
      deliveryDay: checkout.deliveryDay,
      items: checkoutItemsAPI
    };

    newCheckoutAPI(clientId, checkoutAPI)
      .then((response) => {
        console.log('response => newCheckoutAPI', response);
        states.setDeliveryDay(response.data.firstDelivery);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
        // Remove cart objects
        globalContext['cart'].getCart(clientId);

        // Navigate to invoice page
        // navigate('/');
      })
      .catch((error) => {
        console.log('error => newCheckoutAPI', error);
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
    newCheckout,
  };
};