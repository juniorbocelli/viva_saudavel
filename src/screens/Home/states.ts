import React from 'react';

import {
  SelectedProductState,

  LeiteEDerivadosState,
  QueijosState,
  FriosState,
  HortifrutiState,
  BebidasState,
  DocesEGeleiasState,
} from './types';

export interface IUseStates {
  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProductState>>;

  leiteEDerivados: LeiteEDerivadosState;
  setLeiteEDerivados: React.Dispatch<React.SetStateAction<LeiteEDerivadosState>>;

  queijos: QueijosState;
  setQueijos: React.Dispatch<React.SetStateAction<QueijosState>>;

  frios: FriosState;
  setFrios: React.Dispatch<React.SetStateAction<FriosState>>;

  hortifruti: HortifrutiState;
  setHortifruti: React.Dispatch<React.SetStateAction<HortifrutiState>>;

  bebidas: BebidasState;
  setBebidas: React.Dispatch<React.SetStateAction<BebidasState>>;

  docesEGeleias: DocesEGeleiasState;
  setDocesEGeleias: React.Dispatch<React.SetStateAction<DocesEGeleiasState>>;
};

export default function useStates(): IUseStates {
  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);
  
  const [leiteEDerivados, setLeiteEDerivados] = React.useState<LeiteEDerivadosState>([]);
  const [queijos, setQueijos] = React.useState<QueijosState>([]);
  const [frios, setFrios] = React.useState<FriosState>([]);
  const [hortifruti, setHortifruti] = React.useState<HortifrutiState>([]);
  const [bebidas, setBebidas] = React.useState<BebidasState>([]);
  const [docesEGeleias, setDocesEGeleias] = React.useState<DocesEGeleiasState>([]);

  return {
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