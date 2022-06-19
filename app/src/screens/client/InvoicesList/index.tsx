import React from 'react';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import InvoicesListTable from '../../../components/InvoicesListTable';

import useStates from './states';
import { useAuth } from '../../../features/auth/context';
import useAPIs from './apis';

const InvoicesList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const auth = useAuth();

  // Effects
  React.useEffect(() => {
    if (auth.loggedClient)
      apis.getAllClientInvoices(auth.loggedClient.id as string);
  }, [auth.loggedClient]);

  return (
    <MainContentBox primary='Pedidos' states={states} isLoggedIn={true} pageTitle="Pedidos">
      <InvoicesListTable invoices={states.invoices} />
    </MainContentBox>
  );
};

export default InvoicesList;