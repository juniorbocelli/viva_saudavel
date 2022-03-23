import React from 'react';

import { IUseAPIs } from './apis';
import { IUseStates } from './states';

export interface IUseEffects {
  useComponentdidMount: (states: IUseStates) => void;
};

export function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentdidMount = (states: IUseStates) => {
    const {
      token,

      setOperation,
    } = states;

    React.useEffect(() => {
      if (typeof(token) !== "undefined")
        setOperation('resetPassword');
    }, [token, setOperation]);
  };

  return {
    useComponentdidMount,
  };
};