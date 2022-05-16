import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import { SelectedCardState, CardsState, CardValuesEstate } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  selectedCard: SelectedCardState;
  setSelectedCard: React.Dispatch<React.SetStateAction<SelectedCardState>>;

  cards: CardsState;
  setCards: React.Dispatch<React.SetStateAction<CardsState>>

  cardValues: CardValuesEstate;
  setCardValues: React.Dispatch<React.SetStateAction<CardValuesEstate>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [selectedCard, setSelectedCard] = React.useState<SelectedCardState>(undefined);
  const [cards, setCards] = React.useState<CardsState>([]);

  const [cardValues, setCardValues] = React.useState<CardValuesEstate>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',

    issuer: 'unknown',
    isValid: false,

    focused: null,
  });

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    selectedCard,
    setSelectedCard,

    cards,
    setCards,

    cardValues,
    setCardValues,
  };
};