import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/AdminMainContentBox/types';

import { InvoiceFilterState, InvoiceState } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  invoiceFilter: InvoiceFilterState;
  setInvoiceFilter: React.Dispatch<React.SetStateAction<InvoiceFilterState>>;

  invoices: InvoiceState;
  setInvoices: React.Dispatch<React.SetStateAction<InvoiceState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [invoiceFilter, setInvoiceFilter] = React.useState<InvoiceFilterState>({});
  const [invoices, setInvoices] = React.useState<InvoiceState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    invoiceFilter,
    setInvoiceFilter,

    invoices,
    setInvoices,
  };
};