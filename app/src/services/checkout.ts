import axios from '../globals/axios';
import * as Routes from '../globals/routes';
import { WeekDaysName, CheckoutAPI } from '../globals/interfaces/checkout';

export function getDeliveryDateAPI(weekDay: WeekDaysName) {
  return axios.get(Routes.API_CHECKOUT_GET_DELIVERY_DAY.replace(':weekDay', weekDay));
};

export function getAllCheckoutsAPI(filters: Object = {}) {
  return axios.get(Routes.API_CHECKOUT_GET_ALL, {
    params: {
      ...filters,
    }
  });
};

export function newCheckoutAPI(clientId: string, checkout: CheckoutAPI) {
  return axios.post(Routes.API_CHECKOUT_NEW.replace(':clientId', clientId), {
    deliveryDay: checkout.deliveryDay,
    items: checkout.items,
  }, {});
};