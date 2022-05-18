import mongoose from 'mongoose';

import BasketItem from './BasketItem';
import { WeekDaysName } from '../utils/Dates';

class Basket {
    id: mongoose.Types.ObjectId | string | undefined;

    clientId: mongoose.Types.ObjectId | string | null;
    creditCardId: mongoose.Types.ObjectId | string | null;

    weekendDay: WeekDaysName | null;
    items: Array<BasketItem> | null;

    createdAt: Date | null;
    isActive: boolean | null;
};

export default Basket;