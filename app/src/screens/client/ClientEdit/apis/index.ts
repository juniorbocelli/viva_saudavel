import { IUseStates } from '../states';
export interface IUseAPIs {
  getClient: (id: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getClient = (id: string) => {

  };

  return {
    getClient,
  };
};