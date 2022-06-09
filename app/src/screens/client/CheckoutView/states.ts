import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import {
  DeliveryDayState,
  ShippingValueState,
  ActiveCreditCardState,

  AllItemsState,
  OnceItemsState,
  WeeklyItemsState,
  BiweeklyItemsState,
  MonthlyItemsState,

  ProductsPriceState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  deliveryDay: DeliveryDayState;
  setDeliveryDay: React.Dispatch<React.SetStateAction<DeliveryDayState>>;

  shippingValue: ShippingValueState;
  setShippingValue: React.Dispatch<React.SetStateAction<ShippingValueState>>;

  activeCreditCard: ActiveCreditCardState;
  setActiveCreditCard: React.Dispatch<React.SetStateAction<ActiveCreditCardState>>;

  allItems: AllItemsState;
  setAllItems: React.Dispatch<React.SetStateAction<AllItemsState>>;

  onceItems: OnceItemsState;
  setOnceItems: React.Dispatch<React.SetStateAction<OnceItemsState>>;

  weeklyItems: WeeklyItemsState;
  setWeeklyItems: React.Dispatch<React.SetStateAction<WeeklyItemsState>>;

  biweeklyItems: BiweeklyItemsState;
  setBiweeklyItems: React.Dispatch<React.SetStateAction<BiweeklyItemsState>>;

  monthlyItems: MonthlyItemsState;
  setMonthlyItems: React.Dispatch<React.SetStateAction<MonthlyItemsState>>;

  productsPrice: ProductsPriceState;
  setProductsPrice: React.Dispatch<React.SetStateAction<ProductsPriceState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [deliveryDay, setDeliveryDay] = React.useState<DeliveryDayState>(null);
  const [shippingValue, setShippingValue] = React.useState<ShippingValueState>(null);

  const [activeCreditCard, setActiveCreditCard] = React.useState<ActiveCreditCardState>(null);

  const [allItems, setAllItems] = React.useState<AllItemsState>([]);
  const [onceItems, setOnceItems] = React.useState<OnceItemsState>([]);
  const [weeklyItems, setWeeklyItems] = React.useState<WeeklyItemsState>([]);
  const [biweeklyItems, setBiweeklyItems] = React.useState<BiweeklyItemsState>([]);
  const [monthlyItems, setMonthlyItems] = React.useState<MonthlyItemsState>([]);

  const [productsPrice, setProductsPrice] = React.useState<ProductsPriceState>(0);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    deliveryDay,
    setDeliveryDay,

    shippingValue,
    setShippingValue,

    activeCreditCard,
    setActiveCreditCard,

    allItems,
    setAllItems,

    onceItems,
    setOnceItems,

    weeklyItems,
    setWeeklyItems,

    biweeklyItems,
    setBiweeklyItems,

    monthlyItems,
    setMonthlyItems,

    productsPrice,
    setProductsPrice,
  };
};