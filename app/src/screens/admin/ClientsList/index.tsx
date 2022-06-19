import React from 'react';

import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';
import ClientsListTable from './components/ClientsListTable';

import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';

const ClientsList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const effects = useEffects(apis);

  effects.useComponentDidMount();

  return (
    <AdminMainContentBox primary='Clientes' states={states} pageTitle="Dashboard Clientes">
      <ClientsListTable clients={states.clients} />
    </AdminMainContentBox>
  );
};

export default ClientsList;