import React from 'react';

import { ReceivedAddressState } from './types';

export interface IUseState {
  receivedAddress: ReceivedAddressState;
  setReceivedAddress: React.Dispatch<React.SetStateAction<ReceivedAddressState>>;
};

export default function useStates(): IUseState {
  const [receivedAddress, setReceivedAddress] = React.useState<ReceivedAddressState>(null);

  return {
    receivedAddress,
    setReceivedAddress,
  };
};