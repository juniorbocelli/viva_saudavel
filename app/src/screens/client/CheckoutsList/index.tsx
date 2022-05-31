import React from 'react';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import CheckoutsListTable from '../../../components/CheckoutsListTable';

import useStates from './states';
import useAPIs from './apis';
import { useAuth } from '../../../features/auth/context';

const CheckoutsList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const auth = useAuth();

  // Effects
  React.useEffect(() => {
    if (auth.loggedClient)
      apis.getAllCheckouts(auth.loggedClient.id as string);
  }, [states.checkoutFilter, auth.loggedClient]);

  return (
    <MainContentBox primary="Cestas" states={states}>
      <CheckoutsListTable checkouts={states.checkouts} />
    </MainContentBox>
  );
};

export default CheckoutsList;