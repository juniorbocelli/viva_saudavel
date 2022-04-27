import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/AdminMainContentBox/types';

import {
  ClientsState,
  FilterSearchState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  clients: ClientsState;
  setClients: React.Dispatch<React.SetStateAction<ClientsState>>;

  filterSearch: FilterSearchState;
  setFilterSearch: React.Dispatch<React.SetStateAction<FilterSearchState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [clients, setClients] = React.useState<ClientsState>([]);
  const [filterSearch, setFilterSearch] = React.useState<FilterSearchState>(null);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    clients,
    setClients,

    filterSearch,
    setFilterSearch,
  };
};