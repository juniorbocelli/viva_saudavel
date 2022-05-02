import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../ui/components/pages/AdminMainContentBox/types';

import {
  SelectedProductState,
  CardsState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProductState>>;

  cards: CardsState;
  setCards: React.Dispatch<React.SetStateAction<CardsState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);
  const [cards, setCards] = React.useState<CardsState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    selectedProduct,
    setSelectedProduct,

    cards,
    setCards,
  };
};