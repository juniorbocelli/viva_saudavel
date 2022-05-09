import React from 'react';

import { LoggedClientState } from '../../../features/auth/types';
import { IUseAPIs } from './apis';

export interface IUseEffects {
  useComponentDidMount: (client: LoggedClientState) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentDidMount = (client: LoggedClientState) => {
    React.useEffect(() => {
      if (typeof (client) !== 'undefined' && client !== null)
        if (typeof (client.id) !== 'undefined')
          apis.getClient(client.id);
    }, [client]);
  };

  return {
    useComponentDidMount,
  };
};

