import React from 'react';

import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';
import CheckoutsListTable from './components/CheckoutsListTable';

import useStates from './states';

const CheckoutsList: React.FC<React.ReactFragment> = () => {
  const states = useStates();

  return (
    <AdminMainContentBox primary="Cestas" states={states}>
      <CheckoutsListTable checkouts={states.checkouts} />
    </AdminMainContentBox>
  );
};

export default CheckoutsList;