import React from 'react';

import {
  IsMobileOpenState,
  IsMobileCartOpenState,
} from './types';

export interface IUseStates {
  isMobileOpen: IsMobileOpenState;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<IsMobileOpenState>>;

  isMobileCartOpen: IsMobileCartOpenState;
  setIsMobileCartOpen: React.Dispatch<React.SetStateAction<IsMobileCartOpenState>>;
};

export default function useStates(): IUseStates {
  const [isMobileOpen, setIsMobileOpen] = React.useState<IsMobileOpenState>(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = React.useState(false);

  return {
    isMobileCartOpen,
    setIsMobileCartOpen,

    isMobileOpen,
    setIsMobileOpen,
  };
};