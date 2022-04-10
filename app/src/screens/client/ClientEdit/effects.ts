import React from 'react';

import { LoggedClientState } from '../../../features/auth/types';
import { IUseAPIs } from './apis';

export interface IUseEffects {
  useComponentDidMount: (client: LoggedClientState) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentDidMount = (client: LoggedClientState) => {
    React.useEffect(() => {
      if (client !== null)
        apis.getClient(client.id);
    }, [client]);
  };

  return {
    useComponentDidMount,
  };
};

