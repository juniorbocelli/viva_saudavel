import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import { DeliveryDayState, ShippingValueState, HasActiveCardState} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  deliveryDay: DeliveryDayState;
  setDeliveryDay: React.Dispatch<React.SetStateAction<DeliveryDayState>>;

  shippingValue: ShippingValueState;
  setShippingValue: React.Dispatch<React.SetStateAction<ShippingValueState>>;

  hasActiveCard: HasActiveCardState;
  setHasActiveCard: React.Dispatch<React.SetStateAction<HasActiveCardState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [deliveryDay, setDeliveryDay] = React.useState<DeliveryDayState>(null);
  const [shippingValue, setShippingValue] = React.useState<ShippingValueState>(null);

  const [hasActiveCard, setHasActiveCard] = React.useState<HasActiveCardState>(false);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    deliveryDay,
    setDeliveryDay,

    shippingValue,
    setShippingValue,

    hasActiveCard,
    setHasActiveCard,
  };
};