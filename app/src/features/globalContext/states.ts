import React from 'react';

import {
  IUseStates,

  IsQueryingAPIState,
  DialogMessageState,

  CartState,

  OnceItemsState,
  WeeklyItemsState,
  BiweeklyItemsState,
  MonthlyItemsState,
} from './types';

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [cart, setCart] = React.useState<CartState>([]);

  const [onceItems, setOnceItems] = React.useState<OnceItemsState>([]);
  const [weeklyItems, setWeeklyItems] = React.useState<WeeklyItemsState>([]);
  const [biweeklyItems, setBiweeklyItems] = React.useState<BiweeklyItemsState>([]);
  const [monthlyItems, setMonthlyItems] = React.useState<MonthlyItemsState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    cart,
    setCart,

    onceItems,
    setOnceItems,

    weeklyItems,
    setWeeklyItems,

    biweeklyItems,
    setBiweeklyItems,

    monthlyItems,
    setMonthlyItems,
  };
};