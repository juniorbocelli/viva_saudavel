import React from 'react';
import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/MainContentBox/types';

import { InvoiceState } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  invoice: InvoiceState;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [invoice, setInvoice] = React.useState<InvoiceState>(null);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    invoice,
    setInvoice,
  };
};