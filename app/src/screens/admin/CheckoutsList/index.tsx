import React from 'react';

import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';
import CheckoutsListTable from '../../../components/CheckoutsListTable';

import useStates from './states';
import useAPIs from './apis';

const CheckoutsList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);

  // Effects
  React.useEffect(() => {
    apis.getAllCheckouts({});
  }, []);

  return (
    <AdminMainContentBox primary="Cestas" states={states}>
      <CheckoutsListTable checkouts={states.checkouts} />
    </AdminMainContentBox>
  );
};

export default CheckoutsList;