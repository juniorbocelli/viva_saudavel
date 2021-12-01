import React from 'react';

import {
  IsMobileOpenState,
} from './types';

export interface IUseStates {
  isMobileOpen: IsMobileOpenState;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<IsMobileOpenState>>;
};

export default function useStates(): IUseStates {
  const [isMobileOpen, setIsMobileOpen] = React.useState<IsMobileOpenState>(false);

  return {
    isMobileOpen: isMobileOpen,
    setIsMobileOpen: setIsMobileOpen,
  };
};