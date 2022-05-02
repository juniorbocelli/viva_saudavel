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

  leiteEDerivados: CardsState;
  setLeiteEDerivados: React.Dispatch<React.SetStateAction<CardsState>>;

  queijos: CardsState;
  setQueijos: React.Dispatch<React.SetStateAction<CardsState>>;

  frios: CardsState;
  setFrios: React.Dispatch<React.SetStateAction<CardsState>>;

  hortifruti: CardsState;
  setHortifruti: React.Dispatch<React.SetStateAction<CardsState>>;

  bebidas: CardsState;
  setBebidas: React.Dispatch<React.SetStateAction<CardsState>>;

  docesEGeleias: CardsState;
  setDocesEGeleias: React.Dispatch<React.SetStateAction<CardsState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);
  
  const [leiteEDerivados, setLeiteEDerivados] = React.useState<CardsState>([]);
  const [queijos, setQueijos] = React.useState<CardsState>([]);
  const [frios, setFrios] = React.useState<CardsState>([]);
  const [hortifruti, setHortifruti] = React.useState<CardsState>([]);
  const [bebidas, setBebidas] = React.useState<CardsState>([]);
  const [docesEGeleias, setDocesEGeleias] = React.useState<CardsState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    selectedProduct,
    setSelectedProduct,

    leiteEDerivados,
    setLeiteEDerivados,

    queijos,
    setQueijos,

    frios,
    setFrios,

    hortifruti,
    setHortifruti,

    bebidas,
    setBebidas,

    docesEGeleias,
    setDocesEGeleias,
  };
};