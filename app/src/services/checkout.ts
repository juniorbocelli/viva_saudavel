import axios from '../globals/axios';
import * as Routes from '../globals/routes';
import { CheckoutAPI } from '../globals/interfaces/checkout';
import { WeekDaysName } from '../globals/interfaces/dateTime';

export function getDeliveryDateAPI(weekDay: WeekDaysName) {
  return axios.get(Routes.API_CHECKOUT_GET_DELIVERY_DAY.replace(':weekDay', weekDay));
};

export function getAllAdminCheckoutsAPI(filters: Object = {}) {
  return axios.get(Routes.API_CHECKOUT_ADMIN_GET_ALL, {
    params: {
      ...filters,
    }
  });
};

export function getAllClientCheckoutsAPI(clientId: string, filters: Object = {}) {
  return axios.get(Routes.API_CHECKOUT_CLIENT_GET_ALL
    .replace(':clientId', clientId), {
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