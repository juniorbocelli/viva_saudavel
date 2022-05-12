import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import { CreditCardIdState, CardsState } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  creditCardId: CreditCardIdState;
  setCreditCardId: React.Dispatch<React.SetStateAction<CreditCardIdState>>;

  cards: CardsState;
  setCards: React.Dispatch<React.SetStateAction<CardsState>>
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [creditCardId, setCreditCardId] = React.useState<CreditCardIdState>(undefined);
  const [cards, setCards] = React.useState<CardsState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    creditCardId,
    setCreditCardId,

    cards,
    setCards,
  };
};