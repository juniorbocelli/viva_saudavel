import axios from '../globals/axios';
import * as Routes from '../globals/routes';
import { CheckoutAPI } from '../globals/interfaces/checkout';
import { WeekDaysName } from '../globals/interfaces/dateTime';

export function getDeliveryDateAPI(weekDay: WeekDaysName) {
  return axios.get(Routes.API_CHECKOUT_GET_DELIVERY_DAY.replace(':weekDay', weekDay));
};

export function getAllCheckoutsAdminAPI(filters: Object = {}) {
  return axios.get(Routes.API_CHECKOUT_ADMIN_GET_ALL, {
    params: {
      ...filters,
    }
  });
};

export function getAllCheckoutsClientAPI(clientId: string, filters: Object = {}) {
  return axios.get(Routes.API_CHECKOUT_CLIENT_GET_ALL
    .replace(':clientId', clientId), {
    params: {
      ...filters,
    }
  });
};

export function getCheckoutAdminAPI(id: string) {
  return axios.get(Routes.API_CHECKOUT_ADMIN_GET
    .replace(':id', id));
};

export function getCheckoutClientAPI(clientId: string, id: string) {
  return axios.get(Routes.API_CHECKOUT_CLIENT_GET
    .replace(':clientId', clientId)
    .replace(':id', id));
};

export function newCheckoutAPI(clientId: string, checkout: CheckoutAPI) {
  return axios.post(Routes.API_CHECKOUT_NEW.replace(':clientId', clientId), {
    deliveryDay: checkout.deliveryDay,
    items: checkout.items,
  }, {});
};

export function getNextDeliveryDateAdminAPI(id: string) {
  return axios.get(Routes.API_CHECKOUT_ADMIN_GET_NEXT_DELIVERY_DATE
    .replace(':id', id));
};

export function getNextDeliveryDateClientAPI(clientId: string, id: string) {
  return axios.get(Routes.API_CHECKOUT_CLIENT_GET_NEXT_DELIVERY_DATE
    .replace(':clientId', clientId)
    .replace(':id', id));
};

export function handleActiveCheckoutAdminAPI(id: string, active: boolean) {
  return axios.patch(Routes.API_CHECKOUT_ADMIN_HANDLE_ACTIVE
    .replace(':id', id),
    {
      isActive: active,
    });
};

export function handleActiveCheckoutClientAPI(clientId: string, id: string, active: boolean) {
  return axios.patch(Routes.API_CHECKOUT_CLIENT_HANDLE_ACTIVE
    .replace(':clientId', clientId)
    .replace(':id', id),
    {
      isActive: active,
    });
};