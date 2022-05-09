import axios from '../globals/axios';
import * as Routes from '../globals/routes';
import { WeekDaysName } from '../globals/interfaces/checkout';

export function getDeliveryDateAPI(weekDay: WeekDaysName) {
    return axios.get(Routes.API_CHECKOUT_GET_DELIVERY_DAY.replace(':weekDay', weekDay));
};