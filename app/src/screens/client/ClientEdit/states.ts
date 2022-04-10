import React from 'react';
import {
  IsQueryingAPIState,
  ErrorMessageState,
} from '../../../ui/components/pages/MainContentBox/types';
import { ClientState } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;

  client: ClientState;
  setClient: React.Dispatch<React.SetStateAction<ClientState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(undefined);
  const [client, setClient] = React.useState<ClientState>(null);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,

    client,
    setClient,
  };
};