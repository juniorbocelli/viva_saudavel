import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/AdminMainContentBox/types';

import {
  CheckoutsState,
  CheckoutFilterState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  checkouts: CheckoutsState;
  setCheckouts: React.Dispatch<React.SetStateAction<CheckoutsState>>;

  checkoutFilter: CheckoutFilterState;
  setCheckoutFilter: React.Dispatch<React.SetStateAction<CheckoutFilterState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [checkouts, setCheckouts] = React.useState<CheckoutsState>([]);
  const [checkoutFilter, setCheckoutFilter] = React.useState<CheckoutFilterState>({});

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    checkouts,
    setCheckouts,

    checkoutFilter,
    setCheckoutFilter,
  };
};