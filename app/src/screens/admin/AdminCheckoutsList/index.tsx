import React from 'react';

import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';
import CheckoutsListTable from '../../../components/CheckoutsListTable';

import useStates from './states';
import useAPIs from './apis';

const AdminCheckoutsList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);

  // Effects
  React.useEffect(() => {
    apis.getAllCheckouts();
  }, [states.checkoutFilter]);

  return (
    <AdminMainContentBox primary="Cestas" states={states} pageTitle="Dashboard Cestas">
      <CheckoutsListTable checkouts={states.checkouts} />
    </AdminMainContentBox>
  );
};

export default AdminCheckoutsList;