import React from 'react';

import {
  OperationState,
  TokenState,
} from './types';

export interface IUseStates {
  operation: OperationState;
  setOperation: React.Dispatch<React.SetStateAction<OperationState>>;

  token: TokenState;
  setToken: React.Dispatch<React.SetStateAction<TokenState>>;
};

export default function useStates(): IUseStates {
  const [operation, setOperation] = React.useState<OperationState>('signIn');
  const [token, setToken] = React.useState<TokenState>(undefined);

  return {
    operation,
    setOperation,

    token,
    setToken,
  };
};