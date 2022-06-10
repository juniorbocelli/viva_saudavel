import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import {
  ShippingValueState,
  ActiveCreditCardState,

  CheckoutState,

  OnceItemsState,
  WeeklyItemsState,
  BiweeklyItemsState,
  MonthlyItemsState,

  PricesState,
  DeliveryDatesState,
  IsActiveState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  shippingValue: ShippingValueState;
  setShippingValue: React.Dispatch<React.SetStateAction<ShippingValueState>>;

  activeCreditCard: ActiveCreditCardState;
  setActiveCreditCard: React.Dispatch<React.SetStateAction<ActiveCreditCardState>>;

  checkout: CheckoutState;
  setCheckout: React.Dispatch<React.SetStateAction<CheckoutState>>;

  onceItems: OnceItemsState;
  setOnceItems: React.Dispatch<React.SetStateAction<OnceItemsState>>;

  weeklyItems: WeeklyItemsState;
  setWeeklyItems: React.Dispatch<React.SetStateAction<WeeklyItemsState>>;

  biweeklyItems: BiweeklyItemsState;
  setBiweeklyItems: React.Dispatch<React.SetStateAction<BiweeklyItemsState>>;

  monthlyItems: MonthlyItemsState;
  setMonthlyItems: React.Dispatch<React.SetStateAction<MonthlyItemsState>>;

  prices: PricesState;
  setPrices: React.Dispatch<React.SetStateAction<PricesState>>;

  deliveryDates: DeliveryDatesState;
  setDeliveryDates: React.Dispatch<React.SetStateAction<DeliveryDatesState>>;

  isActive: IsActiveState;
  setIsActive: React.Dispatch<React.SetStateAction<IsActiveState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [shippingValue, setShippingValue] = React.useState<ShippingValueState>(null);

  const [activeCreditCard, setActiveCreditCard] = React.useState<ActiveCreditCardState>(null);

  const [checkout, setCheckout] = React.useState<CheckoutState>(null);

  const [onceItems, setOnceItems] = React.useState<OnceItemsState>([]);
  const [weeklyItems, setWeeklyItems] = React.useState<WeeklyItemsState>([]);
  const [biweeklyItems, setBiweeklyItems] = React.useState<BiweeklyItemsState>([]);
  const [monthlyItems, setMonthlyItems] = React.useState<MonthlyItemsState>([]);

  const [prices, setPrices] = React.useState<PricesState>({
    once: 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
  });
  const [deliveryDates, setDeliveryDates] = React.useState<DeliveryDatesState>(null);
  const [isActive, setIsActive] = React.useState<IsActiveState>(false);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,
    
    shippingValue,
    setShippingValue,

    activeCreditCard,
    setActiveCreditCard,

    checkout,
    setCheckout,

    onceItems,
    setOnceItems,

    weeklyItems,
    setWeeklyItems,

    biweeklyItems,
    setBiweeklyItems,

    monthlyItems,
    setMonthlyItems,

    prices,
    setPrices,

    deliveryDates,
    setDeliveryDates,

    isActive,
    setIsActive,
  };
};