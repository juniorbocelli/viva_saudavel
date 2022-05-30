import React from 'react';

import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';
import InvoicesListTable from '../../../components/InvoicesListTable';

import useStates from './states';
import { useAuth } from '../../../features/auth/context';
import useAPIs from './apis';

const AdminInvoicesList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const auth = useAuth();

  // Effects
  React.useEffect(() => {
    if (auth.loggedClient)
      if (auth.loggedClient.isAdmin)
        apis.getAllAdminInvoices();
  }, [auth.loggedClient]);

  return (
    <AdminMainContentBox primary='Pedidos' states={states}>
      <InvoicesListTable invoices={states.invoices} />
    </AdminMainContentBox>
  );
};

export default AdminInvoicesList;