import React from 'react';

import {
  HasErrorState,
  ErrorMessageState,
} from './types';

export interface IUseStates {
  hasError: HasErrorState;
  setHasError: React.Dispatch<React.SetStateAction<HasErrorState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
}

export default function useStates(): IUseStates {
  const [hasError, setHasError] = React.useState<HasErrorState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>('');

  return {
    hasError: hasError,
    setHasError: setHasError,

    errorMessage: errorMessage,
    setErrorMessage: setErrorMessage,
  };
}