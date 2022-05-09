import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import { DeliveryDayState } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  deliveryDay: DeliveryDayState;
  setDeliveryDay: React.Dispatch<React.SetStateAction<DeliveryDayState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [deliveryDay, setDeliveryDay] = React.useState<DeliveryDayState>(null);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    deliveryDay,
    setDeliveryDay,
  };
};