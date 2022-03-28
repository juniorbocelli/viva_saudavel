import React from 'react';

import { IUseAPIs } from './api';

export interface IUseEffects {
  useFetchComapnyInfo: (clientCompany: number | undefined) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useFetchComapnyInfo = (clientCompany: number | undefined) => {

    React.useEffect(() => {
      if (typeof(clientCompany) !== 'undefined') apis.fetchCompany();

    }, [clientCompany]);
  };

  return {
    useFetchComapnyInfo,
  };
}