import React from 'react';

import {
  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(undefined);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  };
};