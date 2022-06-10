import React from 'react';
import {
  Grid,
} from '@mui/material';

import ClientView from '../../../ui/components/ClientView';
import AddressView from '../../../ui/components/AddressView';
import CreditCardView from '../../../ui/components/CreditCardView';
import MainContentBox from '../../../ui/components/pages/MainContentBox';

import useStates from './states';
import useAPIs from './apis';
import { useAuth } from '../../../features/auth/context';

const Profile: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const auth = useAuth();

  // Effects
  React.useEffect(() => {
    if (auth.loggedClient)
      apis.getActiveCreditCard(auth.loggedClient.id as string);
  }, [auth.loggedClient]);

  return (
    <MainContentBox primary='Meus Dados' isLoggedIn={true}>
      <Grid container>
        <Grid item md={4} xs={12}>
          <ClientView />
        </Grid>

        <Grid item md={4} xs={12}>
          <AddressView />
        </Grid>

        <Grid item md={4} xs={12}>
          <CreditCardView creditCard={states.creditCard} />
        </Grid>
      </Grid>
    </MainContentBox>
  );
};

export default Profile;