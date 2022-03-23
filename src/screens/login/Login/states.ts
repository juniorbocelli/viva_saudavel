import React from 'react';

import {
  IsQueryingAPIState,
  ErrorMessageState,

  OperationState,
  TokenState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;

  operation: OperationState;
  setOperation: React.Dispatch<React.SetStateAction<OperationState>>;

  token: TokenState;
  setToken: React.Dispatch<React.SetStateAction<TokenState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(undefined);

  const [operation, setOperation] = React.useState<OperationState>('signIn');
  const [token, setToken] = React.useState<TokenState>(undefined);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,

    operation,
    setOperation,

    token,
    setToken,
  };
};