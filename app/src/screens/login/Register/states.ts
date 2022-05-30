import React from 'react';

import { IsFromRegionState } from './types';

export interface IUseState {
  isFromRegion: IsFromRegionState;
  setIsFromRegion: React.Dispatch<React.SetStateAction<IsFromRegionState>>;
};

export default function useStates(): IUseState {
  const [isFromRegion, setIsFromRegion] = React.useState<IsFromRegionState>(false);

  return {
    isFromRegion,
    setIsFromRegion,
  };
};