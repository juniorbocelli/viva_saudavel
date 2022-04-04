import registerAPI from './registerAPI';

import { IUseStates } from '../states';
import { RegisterDataSend } from '../types';

export interface IUseAPIs {
  register: (data: RegisterDataSend) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const register = (data: RegisterDataSend) => {
    registerAPI(data).then((response) => {
      console.log('response => registerAPI', response);
    }).catch(error => {
      console.error('error => registerAPI', error);
    })
  };

  return {
    register,
  };
};