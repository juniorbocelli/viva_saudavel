import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/AdminMainContentBox/types';

import {
  CheckoutsState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  checkouts: CheckoutsState;
  setCheckouts: React.Dispatch<React.SetStateAction<CheckoutsState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [checkouts, setCheckouts] = React.useState<CheckoutsState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    checkouts,
    setCheckouts,
  };
};