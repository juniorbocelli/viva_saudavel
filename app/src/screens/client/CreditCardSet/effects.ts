import React from 'react';

import { IUseAPIs } from './apis';

export interface IUseEffects {
  useComponentDidMount: (clientId: string) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentDidMount = (clientId: string | null | undefined) => {
    React.useEffect(() => {
      if (typeof (clientId) !== 'undefined' && clientId !== null)
        apis.getCreditCards(clientId);
    }, [clientId]);
  };

  return {
    useComponentDidMount,
  };
};